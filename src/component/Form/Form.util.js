// eslint-disable-next-line import/prefer-default-export
export const sortFieldsByGroup = (fields) => Object.entries(fields).reduce((acc, [name, data]) => {
    const { group } = data;
    if (group) {
        if (!acc[group]) {
            acc[group] = [];
        }

        acc[group].push({ ...data, id: name, name });
    } else {
        if (!acc.main) {
            acc.main = [];
        }

        acc.main.push({ ...data, id: name, name });
    }

    return acc;
}, {});
