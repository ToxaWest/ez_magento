import { AllHTMLAttributes } from 'react';

export interface childSortInterface extends AllHTMLAttributes<HTMLElement> {
    renderSort?: renderSortInterface
}

interface renderSortInterface {
    [key: string ]: boolean | childSortInterface
}

export interface ProductCardComponentInterface {
    product: ProductInterface,
    wrapperTag?: string,
    renderSort?: renderSortInterface
}
