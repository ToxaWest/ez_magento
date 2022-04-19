import styles from './Header.module.scss';

import HeaderAccount from 'Component/HeaderAccount';
import Logo from 'Component/Logo';
import Menu from 'Component/Menu';
import MiniCart from 'Component/MiniCart';
import StoreSwitcher from 'Component/StoreSwitcher';

const HeaderComponent = () => (
    <header className={ styles.wrapper }>
        <Logo />
        <Menu identifier="category_menu" />
        <HeaderAccount />
        <MiniCart />
        <StoreSwitcher />
    </header>
);

export default HeaderComponent;
