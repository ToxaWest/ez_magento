import { childSortInterface } from '@ui/Render/Render.types';
import { cloneElement, createElement, ReactElement } from 'react';

export const getAttributeValue = ({
    attribute_type, attribute_value, attribute_options
}: SAttributesInterface): string | ReactElement => {
    if (attribute_type === 'text') {
        return attribute_value;
    }

    if (attribute_type === 'select') {
        return attribute_options.find(({ value }) => value === attribute_value).label;
    }

    if (attribute_type === 'boolean') {
        return attribute_value ? 'Yes' : 'No';
    }

    if (attribute_type === 'multiselect') {
        const options = attribute_value.split(',');
        return attribute_options.reduce((acc, { label, value }) => {
            if (options.some((a) => a === value)) {
                return `${acc + label }, `;
            }

            return acc;
        }, '');
    }

    if (attribute_type === 'price') {
        return attribute_value;
    }

    if (attribute_type === 'file') {
        const isVideo = /(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(attribute_value);
        if (isVideo) {
            return createElement('video', {
                controls: true,
                preload: 'none',
                style: { maxWidth: '100%', width: '300px' },
                src: `${process.env.NEXT_PUBLIC_API_URL }/media/catalog/product${ attribute_value}`
            });
        }
    }

    // eslint-disable-next-line no-console
    console.log(`Attribute type not rendered: ${ attribute_type}`);
    return '';
};

export const sortedRender = (
    [key, value]: [string, childSortInterface | boolean],
    renderMap: { [key: string] : ReactElement }
) : ReactElement => {
    if (!value) {
        return null;
    }

    if (typeof value !== 'boolean') {
        const { renderSort: childRenderSort, ...attrs } = value;
        const tag = key.split('_')[0];

        return createElement(
            tag,
            { ...attrs, key },
            Object.entries(childRenderSort)
                .map((r) => sortedRender(r, renderMap))
        );
    }

    if (!renderMap[key]) {
        // eslint-disable-next-line no-console
        console.warn(`${key } is not found for render`);
        return null;
    }

    return cloneElement(renderMap[key], { key });
};
