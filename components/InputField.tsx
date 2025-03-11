
const InputField = ({ id, label, register, errors, placeholder }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-md font-medium text-gray-700 mb-2">{label}</label>
            <input {...register(id)} id={id} placeholder={placeholder} className={`w-full p-3 bg-gray-100 rounded-lg border ${errors[id] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
        </div>
    );
};

export default InputField;