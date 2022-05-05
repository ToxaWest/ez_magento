import ProductCard from '@component/ProductCard';
import Button from '@ui/Button';
import Icon from '@ui/Icon';
import Loader from '@ui/Loader';

interface MyAccountWishlistComponentInterface {
    loading: boolean,
    removeFromWishList: ({ id }: { id: number }) => void,
    items: WishListItem[],
    pageInfo: WishListInfo & WishListPageInfo
}

function MyAccountWishlistComponent(props: MyAccountWishlistComponentInterface) {
    const {
        loading, items, removeFromWishList, pageInfo: {
            sharing_code
        }
    } = props;

    const renderProductCard = ({
        product,
        id,
        quantity,
        added_at
    }: WishListItem) => (
        <li key={ id }>
            <span>
                <Icon name="date_range" />
                { added_at }
            </span>
            <span>
                { `(${quantity}) item'(s)` }
            </span>
            <Button onClick={ () => removeFromWishList({ id }) }><Icon name="delete" /></Button>
            <ProductCard
              product={ product }
            />
        </li>
    );

    const renderProducts = () => (
        <ul>
            { items.map(renderProductCard) }
        </ul>
    );

    return (
        <div>
            <div>{ sharing_code }</div>
            <Loader isLoading={ loading } />
            { renderProducts() }
        </div>
    );
}

export default MyAccountWishlistComponent;
