import { AlignEndHorizontal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-6 bg-purple-100 border-t border-gray-200">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <AlignEndHorizontal className="h-6 w-6 text-purple-600" />
                        <span className="font-semibold">Vanish vote</span>
                    </div>
                </Link>
                <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Vanish vote. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;