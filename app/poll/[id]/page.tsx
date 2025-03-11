'use client'

import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const page = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/poll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('API Response:', data);
                setPoll(data || {});
                setLoading(false);
            })
            .catch((error) => {
                console.log('Fetch Error:', error);
                setLoading(false);
            });
    }, [id]);

    console.log('Posts state:', poll);

    if (loading) return <Spinner />;
    if (!Object.keys(poll).length) return <div>No posts found</div>;

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <p className="text-3xl text-center font-semibold">{poll.title}</p>

                {/* Map over poll.options array */}
                <div className="mt-4">
                    {poll.options && poll.options.length > 0 ? (
                        poll.options.map((option) => (
                            <div
                                key={option.optionId}
                                className="p-3 border rounded-md mt-2 flex justify-between items-center"
                            >
                                <span className="font-medium">{option.text}</span>
                                <span className="text-gray-500">Votes: {option.votes}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No options available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
