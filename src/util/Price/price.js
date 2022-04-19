export const formatPrice = (price, currency, locale) => {
    const options = {
        currency,
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        style: 'currency'
    };

    return new Intl.NumberFormat(locale, options).format(price);
};

export const getFinalPrice = ({ value, currency }, locale) => formatPrice(value, currency, locale);
