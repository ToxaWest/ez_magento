import { AllHTMLAttributes, ReactElement } from 'react';

export interface childSortInterface extends AllHTMLAttributes<HTMLElement> {
    renderSort?: renderSortInterface
}

export interface renderSortInterface {
    [key: string ]: childSortInterface | boolean
}

export interface RenderInterface {
    className?: string,
    renderMap?: { [key: string]: ReactElement },
    renderSort?: renderSortInterface,
    wrapperTag?: string
}
