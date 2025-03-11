import { Loader } from 'lucide-react';
import React from 'react';

const Spinner = () => {
    return (
        <div className='flex justify-center items-center mt-20'>
            <Loader size={50} className='animate-spin' />
        </div>
    );
};

export default Spinner;