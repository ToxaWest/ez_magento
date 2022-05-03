import { renderSortInterface } from '@ui/Render/Render.types';

export interface ProductCardComponentInterface {
    product: ProductInterface,
    wrapperTag?: string,
    renderSort?: renderSortInterface
}
