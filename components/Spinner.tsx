import { Loader } from 'lucide-react';
import React from 'react';

const Spinner = () => {
    return (
        <div className='animate-spin'>
            <Loader className='text-7xl' />
        </div>
    );
};

export default Spinner;