import { Plus, Trash2 } from 'lucide-react';
import React from 'react';

const OptionsField = ({ fields, append, remove, register, errors }) => {
    return (
        <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Options</label>
            {fields.map((item, index) => (
                <div key={item.id} className="flex items-center mb-2">
                    <input {...register(`options.${index}.text`)} placeholder="Type your answer here" className={`w-full p-3 bg-gray-100 rounded-lg border ${errors.options?.[index]?.text ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                    {fields.length > 2 && <button type="button" onClick={() => remove(index)} className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"><Trash2 /></button>}
                </div>
            ))}
            <button type="button" onClick={() => append({ text: '' })} className="w-full p-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-1">Add Options <Plus /></button>
        </div>
    );
};

export default OptionsField;