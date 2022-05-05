import Button from '@ui/Button';

function WishListButtonComponent(props: { addToWishList: () => void, disabled: boolean }) {
    const { addToWishList, disabled } = props;

    return <Button onClick={ addToWishList } disabled={ disabled }>Wishlist</Button>;
}

export default WishListButtonComponent;
