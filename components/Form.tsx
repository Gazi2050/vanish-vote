'use client'

import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";


const Form: React.FC = () => {
    const [options, setOptions] = useState<string[]>(['', '']);

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Poll</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Type your question here"
                            className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="pollType" className="block text-md font-medium text-gray-700 mb-2">
                            Poll Type
                        </label>
                        <div className="relative">
                            <select
                                id="pollType"
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value=" " disabled selected className="text-gray-400">Select type</option>
                                <option>Multiple Choice</option>
                                <option>Single Choice</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-md font-medium text-gray-700 mb-2">Answer Options</label>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder="Type your answer here"
                                    className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                                    >
                                        <Trash2 />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOption}
                            className="w-full p-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-1"
                        >
                            Add More <Plus />
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="pollType" className="block text-md font-medium text-gray-700 mb-2">
                            Expiration Time
                        </label>
                        <div className="relative">
                            <select
                                id="pollType"
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="" disabled selected className="text-gray-400">Select time</option>
                                <option>1 hour</option>
                                <option>12 hours</option>
                                <option> 24 hours</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
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
