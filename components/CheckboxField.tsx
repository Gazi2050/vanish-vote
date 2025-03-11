const CheckboxField = ({ id, label, register }) => {
    return (
        <div className="mb-4 flex items-center">
            <input type="checkbox" {...register(id)} className="mr-2" />
            <label htmlFor={id} className="text-md font-medium text-gray-700">{label}</label>
        </div>
    );
};

export default CheckboxField;