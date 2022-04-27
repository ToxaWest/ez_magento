import styles from './Header.module.scss';

import HeaderAccount from '@component/HeaderAccount';
import Logo from '@component/Logo';
import Menu from '@component/Menu';
import MiniCart from '@component/MiniCart';
import StoreSwitcher from '@component/StoreSwitcher';

function HeaderComponent() {
    return (
<header className={ styles.wrapper }>
        <Logo />
        <Menu identifier="category_menu" />
        <HeaderAccount />
        <MiniCart />
        <StoreSwitcher />
</header>
    );
}

export default HeaderComponent;
