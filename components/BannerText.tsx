import React from 'react';

const BannerText = () => {
    return (
        <div className="flex flex-col items-center text-center my-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                Anonymous Polls That <span className="text-purple-600">Disappear</span>
            </h1>
            <p className=" md:text-xl max-w-2xl mx-auto">
                Create polls that vanish after a set time. No login required, completely anonymous.
            </p>
        </div>
    );
};

export default BannerText;