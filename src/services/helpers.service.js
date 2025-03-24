const verifyRequiredFields = (keys, values, baseFields) => {
    baseFields.forEach(fieldObj => {
        if (!keys.includes(fieldObj.field)) {
            keys.push(fieldObj.field);
            values.push(fieldObj.defaultValue);
        }
    });

    return { keys, values };
};

const createSlug = (str) => {
    return str
        .toString()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export { verifyRequiredFields, createSlug };