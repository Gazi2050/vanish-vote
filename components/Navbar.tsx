import { AlignEndHorizontal, Sun } from 'lucide-react';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-purple-100">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlignEndHorizontal className="h-6 w-6 text-purple-600" />
                        <span className="text-xl font-bold">Vanish vote</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Sun />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;