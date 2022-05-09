import { fieldsInterface } from '@util/Address';

export interface sortedFieldInterface {
    group?: string,
    id: string,
    label: string,
    name: string,
    type: 'text' | 'select' | 'hidden' | 'tel' | 'checkbox',
    validation?: string[]
}

interface sortFieldsByGroupInterface {
    [group: string]: sortedFieldInterface[]
}

// eslint-disable-next-line import/prefer-default-export
export const sortFieldsByGroup = (fields: fieldsInterface) => Object.entries(fields)
    .reduce((acc, [name, data]: [string, sortedFieldInterface]) => {
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
