export const parseDuration = (duration: string): number => {
    const match = duration.match(/^(\d+)(h)$/);
    if (!match) return 0;

    const [, hours] = match;
    return parseInt(hours) * 60 * 60 * 1000;
};

