import { RenderInterface } from '@ui/Render/Render.types';
import { sortedRender } from '@util/Attributes/Attributes';
import { cloneElement, createElement } from 'react';

function RenderComponent({
    wrapperTag, renderSort, renderMap, className
}: RenderInterface) {
    if (!renderMap) {
        throw new Error('renderMap is required');
    }
    if (!renderSort) {
        return createElement(
            wrapperTag,
            { className },
            Object.entries(renderMap).map(
                ([key, node]) => cloneElement(node, { key })
            )
        );
    }

    return createElement(wrapperTag, {
        className
    }, Object.entries(renderSort).map((r) => sortedRender(r, renderMap)));
}

RenderComponent.defaultProps = {
    className: '',
    wrapperTag: 'div',
    renderSort: null,
    renderMap: null
};

export default RenderComponent;
