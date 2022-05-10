import React from 'react';
// eslint-disable-next-line import/prefer-default-export
export const notInteractiveClick = (e: React.KeyboardEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    const { keyCode } = e;
    if (keyCode === 13) {
        target.click();
    }
};
