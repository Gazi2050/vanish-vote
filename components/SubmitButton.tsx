import { Loader } from "lucide-react";

const SubmitButton = ({ isSubmitting }) => {
    return (
        <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className={`px-5 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition ${isSubmitting ? 'cursor-not-allowed' : ''}`}>{isSubmitting ? <Loader className='text-2xl animate-spin' /> : 'Create Poll'}</button>
        </div>
    );
};

export default SubmitButton;