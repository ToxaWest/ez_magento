import { renderSortInterface } from '@ui/Render/Render.types';

export interface ProductCardComponentInterface {
    className?:string,
    product: ProductInterface,
    renderSort?: renderSortInterface,
    wrapperTag?: string
}
