export const formatDate = (isoDate) => {
    try {
        return new Date(isoDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return isoDate;
    }
};
