// Not sure this needed to be rewritten
export const findAll = (message, string, i = 0) => {
    if (string.length > message.length) return [];
    if (message.slice(0, string.length).toLowerCase() === string.toLowerCase())
        return [
            i,
            ...findAll(message.slice(string.length), string, i + string.length),
        ];
    return findAll(message.slice(1), string, i + 1);
};
