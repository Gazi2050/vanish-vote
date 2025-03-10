import { featureData } from '@/constants/data';
import { IconType } from '@/constants/type';
import { Clock, LockKeyhole, Share2 } from 'lucide-react';

const Feature = () => {
    const iconMap: Record<string, IconType> = {
        Clock: Clock,
        LockKeyhole: LockKeyhole,
        Share2: Share2,
    };
    return (
        <div className='text-center py-12 mt-36'>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-1">
                Our Features
            </h1>
            <section className="w-full pb-12 md:pb-24 lg:pb-32 pt-12">
                <div className="container mx-auto px-4">
                    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {featureData.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon];

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-xl border border-gray-200"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200">
                                        {IconComponent && <IconComponent className="h-6 w-6 text-purple-600" />}
                                    </div>
                                    <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
                                    <p className="text-gray-400 mt-2">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Feature;