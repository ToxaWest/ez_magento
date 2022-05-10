export const formatPrice = (price: number, currency: string, locale: string): string => {
    const options = {
        currency,
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        style: 'currency'
    };

    return new Intl.NumberFormat(locale, options).format(price);
};

export const getFinalPrice = ({
    currency,
    value
}: FinalPriceInterface, locale?: string): string => formatPrice(value, currency, locale);
