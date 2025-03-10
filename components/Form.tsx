import React from 'react';

const Form = () => {
    return (
        <div>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
                <form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Type your question here"
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pollType" className="block text-sm font-medium mb-2">Poll Type</label>
                        <select
                            id="pollType"
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Drop Down</option>
                            <option>Multiple Choice</option>
                            <option>Single Choice</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Answer Options</label>
                        <input
                            type="text"
                            placeholder="Type your answer here"
                            className="w-full p-2 mb-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Type your answer here"
                            className="w-full p-2 mb-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="w-full p-2 bg-gray-600 rounded border border-gray-500 hover:bg-gray-500 transition"
                        >
                            Add More +
                        </button>
                    </div>

                    <div className="mb-4">
                        <span className="block text-sm font-medium mb-2">One vote per IP address</span>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="oneVote"
                                id="yes"
                                className="text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="yes" className="ml-2">Yes</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="oneVote"
                                id="no"
                                className="text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="no" className="ml-2">No</label>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
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