export const ACCOUNT_URL = '/account';
export const ACCOUNT_ROUTE_PATHNAME = `${ACCOUNT_URL}/[tab]`;
export const DASHBOARD = 'dashboard';
export const ORDER_LIST = 'orders';
export const DEFAULT_ACCOUNT_TAB = ORDER_LIST;
export const urlWithAccount = (tab) => `${ACCOUNT_URL}/${tab}`;
