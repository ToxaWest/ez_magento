const popupId = {
    ACCOUNT: 'ACCOUNT',
    MINI_CART: 'MINI_CART'
};

const freezeScroll = (): void => {
    document.body.style.overflow = 'hidden';
};

const unfreezeScroll = (): void => {
    document.body.style.overflow = 'auto';
};

export {
    freezeScroll,
    unfreezeScroll,
    popupId
};
