import styles from './MyAccountWishlist.module.scss';

import ProductCard from '@component/ProductCard';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';
import Pagination from '@ui/Pagination';
import { createElement } from 'react';

interface MyAccountWishlistComponentInterface {
    items: WishListItem[],
    loading: boolean,
    pageInfo: WishListInfo & WishListPageInfo,
    removeFromWishList: ({ id }: { id: number }) => void
}

function MyAccountWishlistComponent(props: MyAccountWishlistComponentInterface) {
    const {
        items, loading, pageInfo: {
            page_info,
            sharing_code
        }, removeFromWishList
    } = props;

    const renderPagination = () => createElement(Pagination, { page_info });

    const renderInfo = (id, added_at) => (
        <div className={ styles.info }>
            <span className={ styles.date }>
                <Icon name="date_range" />
                { added_at }
            </span>
            <button aria-label="remove" onClick={ () => removeFromWishList({ id }) }>
                <Icon name="delete" />
            </button>
        </div>
    );

    const renderProductCard = ({
        added_at,
        id,
        product
    }: WishListItem) => (
        <li key={ id } className={ styles.item }>
            { renderInfo(id, added_at) }
            <ProductCard
              product={ product }
            />
        </li>
    );

    const renderProducts = () => (
        <ul className={ styles.list }>
            { items.map(renderProductCard) }
        </ul>
    );

    return (
        <div>
            <div>{ sharing_code }</div>
            <Loader isLoading={ loading } />
            { renderProducts() }
            { renderPagination() }
        </div>
    );
}

export default MyAccountWishlistComponent;
