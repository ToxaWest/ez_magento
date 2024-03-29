import cartFragment from './fragment/Cart.fragment.graphql';
import categoryMenuFragment from './fragment/categoryMenu.fragment.graphql';
import postCardFragment from './fragment/postCard.fragment.graphql';
import price_range from './fragment/PriceRange.fragment.graphql';
import priceFragment from './fragment/ProductPrice.fragment.graphql';
import addProductsToCart from './mutation/addProductsToCart.graphql';
import addProductsToWishlist from './mutation/addProductsToWishlist.graphql';
import createEmptyCart from './mutation/createEmptyCart.graphql';
import estimateShippingCosts from './mutation/estimateShippingCosts.graphql';
import generateCustomerToken from './mutation/generateCustomerToken.graphql';
import mergeCarts from './mutation/mergeCarts.graphql';
import placeOrder from './mutation/placeOrder.graphql';
import removeItemFromCart from './mutation/removeItemFromCart.graphql';
import setBillingAddressOnCart from './mutation/setBillingAddressOnCart.graphql';
import setPaymentMethodOnCart from './mutation/setPaymentMethodOnCart.graphql';
import setShippingAddressesOnCart from './mutation/setShippingAddressesOnCart.graphql';
import setShippingMethodsOnCart from './mutation/setShippingMethodsOnCart.graphql';
import availableStores from './query/availableStores.graphql';
import blogCategory from './query/blogCategory.graphql';
import blogPost from './query/blogPost.graphql';
import blogPosts from './query/blogPosts.graphql';
import cart from './query/cart.query.graphql';
import category from './query/category.graphql';
import cmsPage from './query/cmsPage.graphql';
import config from './query/config.graphql';
import countries from './query/countries.graphql';
import country from './query/country.graphql';
import customer from './query/customer.graphql';
import customerOrders from './query/customerOrders.graphql';
import menu from './query/menu.graphql';
import product from './query/product.graphql';
import productList from './query/productList.graphql';
import productListInformation from './query/productListInformation.graphql';
import scandiwebSlider from './query/scandiwebSlider.graphql';
import urlResolver from './query/urlResolver.graphql';

export {
    addProductsToWishlist,
    blogPost,
    postCardFragment,
    blogPosts,
    blogCategory,
    scandiwebSlider,
    setPaymentMethodOnCart,
    setBillingAddressOnCart,
    setShippingAddressesOnCart,
    setShippingMethodsOnCart,
    country,
    countries,
    estimateShippingCosts,
    categoryMenuFragment,
    customerOrders,
    availableStores,
    mergeCarts,
    customer,
    generateCustomerToken,
    removeItemFromCart,
    cartFragment,
    price_range,
    addProductsToCart,
    createEmptyCart,
    cart,
    category,
    config,
    menu,
    cmsPage,
    priceFragment,
    product,
    productList,
    productListInformation,
    urlResolver,
    placeOrder
};
