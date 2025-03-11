export const parseDuration = (durationString: string): number => {
    if (durationString === '1 hour') return 3600000;
    if (durationString === '12 hours') return 43200000;
    if (durationString === '24 hours') return 86400000;
    return 0;
};

export const formatTime = (duration) => {
    return [
        duration.hours().toString().padStart(2, '0'),
        duration.minutes().toString().padStart(2, '0'),
        duration.seconds().toString().padStart(2, '0')
    ].join(':');
};