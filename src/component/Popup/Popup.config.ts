const popupId = {
    ACCOUNT: 'ACCOUNT',
    MINI_CART: 'MINI_CART'
};

const freezeScroll = () => {
    document.body.style.overflow = 'hidden';
};

const unfreezeScroll = () => {
    document.body.style.overflow = 'auto';
};

export {
    freezeScroll,
    unfreezeScroll,
    popupId
};
