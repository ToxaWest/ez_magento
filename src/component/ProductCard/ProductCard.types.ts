import { renderSortInterface } from '@ui/Render/Render.types';

export interface ProductCardComponentInterface {
    product: ProductInterface,
    renderSort?: renderSortInterface,
    wrapperTag?: string
}
