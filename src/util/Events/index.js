// eslint-disable-next-line import/prefer-default-export
export const notInteractiveClick = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
        e.target.click();
    }
};
