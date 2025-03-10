'use client';

import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "@/constants/schema";
import moment from 'moment';
import { FormData } from "@/constants/type";
import { parseDuration } from "@/lib/functions";

const Form = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {

        const expirationDuration = data.expirationTime;
        const expiresAt = moment().add(parseDuration(expirationDuration), 'milliseconds').toDate();

        const pollData = {
            title: data.title,
            pollType: data.pollType,
            options: data.options.map((option, index) => ({
                optionId: `option-${index}`,
                text: option.text,
                votes: 0
            })),
            createdAt: new Date(),
            expiresAt,
            isResultsHidden: data.hideResults || false,
            reactions: { trending: 0, like: 0 },
            comments: [],
            isActive: true
        };

        console.log(pollData);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Poll</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            {...control.register("title")}
                            placeholder="Type your question here"
                            className={`w-full p-3 bg-gray-100 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="pollType" className="block text-md font-medium text-gray-700 mb-2">
                            Poll Type
                        </label>
                        <div className="relative">
                            <select
                                id="pollType"
                                {...control.register("pollType")}
                                className={`w-full p-3 bg-gray-100 rounded-lg border ${errors.pollType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                            >
                                <option value=" " disabled selected className="text-gray-400">Select type</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="single-choice">Single Choice</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        {errors.pollType && <p className="text-red-500 text-sm">{errors.pollType.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700 mb-2">Options</label>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    {...control.register(`options.${index}.text` as const)}
                                    placeholder="Type your answer here"
                                    className={`w-full p-3 bg-gray-100 rounded-lg border ${errors.options?.[index]?.text ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {fields.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                                    >
                                        <Trash2 />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ text: '' })}
                            className="w-full p-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-1"
                        >
                            Add Options <Plus />
                        </button>
                        {errors.options && <p className="text-red-500 text-sm">{errors.options?.[0]?.text?.message || "At least two options are required"}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="expirationTime" className="block text-md font-medium text-gray-700 mb-2">
                            Expiration Time
                        </label>
                        <div className="relative">
                            <select
                                id="expirationTime"
                                {...control.register("expirationTime")}
                                className={`w-full p-3 bg-gray-100 rounded-lg border ${errors.expirationTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                            >
                                <option value="" disabled selected className="text-gray-400">Select time</option>
                                <option value="1h">1 hour</option>
                                <option value="12h">12 hours</option>
                                <option value="24h">24 hours</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        {errors.expirationTime && <p className="text-red-500 text-sm">{errors.expirationTime.message}</p>}
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            {...control.register("hideResults")}
                            className="mr-2"
                        />
                        <label htmlFor="hideResults" className="text-md font-medium text-gray-700">
                            Hide results until poll ends
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-5 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition"
                        >
                            Create Poll
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
