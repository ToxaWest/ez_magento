import { fieldsInterface } from '@util/Address';

interface sortFieldsByGroupInterface {
    [group: string]: {
        id: string,
        name: string
    }[]
}

// eslint-disable-next-line import/prefer-default-export
export const sortFieldsByGroup = (fields: fieldsInterface) => Object.entries(fields)
    .reduce((acc, [name, data]: [string, { group?: string }]) => {
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
    }, {} as sortFieldsByGroupInterface);
