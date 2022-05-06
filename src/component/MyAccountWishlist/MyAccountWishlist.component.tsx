import styles from './MyAccountWishlist.module.scss';

import ProductCard from '@component/ProductCard';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';
import Pagination from '@ui/Pagination';
import { createElement } from 'react';

interface MyAccountWishlistComponentInterface {
    loading: boolean,
    removeFromWishList: ({ id }: { id: number }) => void,
    items: WishListItem[],
    pageInfo: WishListInfo & WishListPageInfo
}

function MyAccountWishlistComponent(props: MyAccountWishlistComponentInterface) {
    const {
        loading, items, removeFromWishList, pageInfo: {
            sharing_code,
            page_info
        }
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
        product,
        id,
        added_at
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
