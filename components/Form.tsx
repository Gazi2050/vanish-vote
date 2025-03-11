'use client';
/* eslint-disable */
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "@/constants/schema";
import { FormData } from "@/constants/type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import SelectField from "./SelectField";
import OptionsField from "./OptionsField";
import CheckboxField from "./CheckboxField";
import SubmitButton from "./SubmitButton";
import moment from 'moment';
import { parseDuration } from "@/lib/functions";


const Form = () => {
    const { control, handleSubmit, formState: { errors }, register } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({ control, name: "options" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        const createdAt = new Date(); // Current date and time
        const expirationDuration = parseDuration(data.expirationTime);

        if (expirationDuration <= 0) {
            setSubmitError('Invalid expiration time');
            setIsSubmitting(false);
            return;
        }

        const expiresAt = moment(createdAt).add(expirationDuration, 'milliseconds').toDate();
        console.log('Created At:', createdAt);
        console.log('Expires At:', expiresAt);

        const pollData = {
            ...data,
            options: data.options.map((option, index) => ({
                optionId: `option-${index}`,
                text: option.text,
                votes: 0
            })),
            createdAt,
            expiresAt,
            isResultsHidden: data.hideResults || false,
            reactions: { trending: 0, like: 0 },
            comments: [],
            isActive: true
        };

        try {
            const response = await fetch('/api/create-poll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pollData)
            });

            if (!response.ok) throw new Error('Failed to create poll');
            const result = await response.json();
            router.push(`/poll/${result.insertedId}`);
        } catch (error: any) {
            setSubmitError(error.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Poll</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField id="title" label="Title" register={register} errors={errors} placeholder="Type your question here" />
                    <SelectField id="pollType" label="Poll Type" register={register} errors={errors} options={["multiple-choice", "single-choice"]} />
                    <OptionsField fields={fields} append={append} remove={remove} register={register} errors={errors} />
                    <SelectField id="expirationTime" label="Expiration Time" register={register} errors={errors} options={["1 hour", "12 hours", "24 hours"]} />
                    <CheckboxField id="hideResults" label="Hide results until poll ends" register={register} />
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            </div>
        </div>
    );
};

export default Form;
