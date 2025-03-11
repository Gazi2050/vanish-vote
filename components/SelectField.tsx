import { ChevronDownIcon } from 'lucide-react';

const SelectField = ({ id, label, register, errors, options }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-md font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <select {...register(id)} id={id} className={`w-full p-3 bg-gray-100 rounded-lg border ${errors[id] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}>
                    <option value="" disabled selected className="text-gray-400">Select {label.toLowerCase()}</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
        </div>
    );
};

export default SelectField;