import { AllHTMLAttributes, ReactElement } from 'react';

export interface childSortInterface extends AllHTMLAttributes<HTMLElement> {
    renderSort?: renderSortInterface
}

export interface renderSortInterface {
    [key: string ]: boolean | childSortInterface
}

export interface RenderInterface {
    wrapperTag?: string,
    renderSort?: renderSortInterface,
    renderMap?: { [key: string]: ReactElement },
    className?: string
}
