export const parseDuration = (durationString: string): number => {
    if (durationString === '1 hour') return 3600000;
    if (durationString === '12 hours') return 43200000;
    if (durationString === '24 hours') return 86400000;
    return 0;
};

