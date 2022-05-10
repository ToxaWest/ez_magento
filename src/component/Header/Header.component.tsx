import styles from './Header.module.scss';

import HeaderAccount from '@component/HeaderAccount';
import Logo from '@component/Logo';
import Menu from '@component/Menu';
import MiniCart from '@component/MiniCart';
import StoreSwitcher from '@component/StoreSwitcher';
import { ReactElement } from 'react';

function HeaderComponent(): ReactElement {
    return (
        <header className={ styles.wrapper }>
            <Menu identifier="category_menu" />
            <Logo />
            <HeaderAccount />
            <MiniCart />
            <StoreSwitcher />
        </header>
    );
}

export default HeaderComponent;
