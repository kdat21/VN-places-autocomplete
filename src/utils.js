export const apiURL = 'https://api.locationiq.com/v1/autocomplete?key=pk.d46b8884756033610804459df77056df&countrycodes=vn'
export const removeDuplicatePlaces = (array, field) => {
    const seen = new Set();
    const result = [];
    array.forEach(item => {
        if (!seen.has(item[field])) {
            seen.add(item[field]);
            result.push(item);
        }
    });
    return result;
}
