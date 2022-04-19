export const CHECKOUT_URL = '/checkout';
export const SHIPPING = 'shipping';
export const BILLING = 'billing';
export const PAYMENT = 'payment';
export const DELIVERY = 'delivery';
export const SUCCESS = 'success';
export const CHECKOUT_ROUTE_PATHNAME = `${CHECKOUT_URL}/[tab]`;
export const urlWithCheckout = (tab) => `${CHECKOUT_URL}/${tab}`;
export const ORDER_DATA = 'ORDER_DATA';
