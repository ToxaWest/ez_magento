import styles from './Menu.module.scss';

import Link from '@component/Link';
import Icon from '@ui/Icon';
import classNames from 'classnames';

const cx = classNames.bind(styles);

export interface menuItemInterface {
    children: menuItemInterface[],
    item_id: string,
    parent_id: number,
    title: string,
    url: string
}

interface MenuComponentInterface {
    isActive: (id: number) => boolean
    menu: {
        children: menuItemInterface[],
        item_id: string,
        parent_id: number,
        title: string,
        url: string
    }[],
    toggle: (item_id: number, parent_id: number) => void,
    toggleMenu: () => void,
    menuOpened: boolean
}

function MenuComponent({
    isActive, menu, menuOpened, toggle, toggleMenu
}: MenuComponentInterface) {
    const renderMenuItem = (item: menuItemInterface, level: number) => {
        const {
            children, item_id, parent_id, title, url
        } = item;
        const hasChild = Object.keys(children).length > 0;
        return (
            <li
              key={ item_id }
              role="menuitem"
              aria-current={ isActive(parseInt(item_id, 10)) }
              className={ cx(
                  styles.menu_item,
                  styles[`level_${level}`],
              ) }
            >
                <Link href={ url } title={ title }>{ title }</Link>
                { /* eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define */ }
                { hasChild && renderChild(Object.values(children), parseInt(item_id, 10), parent_id, level) }
            </li>
        );
    };

    const renderChild = (items: menuItemInterface[], item_id: number, parent_id: number, level: number) => (
        <>
            <button
              onClick={ () => toggle(item_id, parent_id) }
              className={ styles.toggle }
              aria-label="toggle"
            >
                <Icon name={ isActive(item_id) ? 'expand_less' : 'expand_more' } />
            </button>
            <div className={ cx(styles.child_wrapper) }>
                <ul
                  role="menu"
                  className={ cx(
                      styles.menu_child,
                      {
                          [styles.menu_child_active]: isActive(item_id)
                      }
                  ) }
                >
                { items.map((i) => renderMenuItem(i, level + 1)) }
                </ul>
            </div>
        </>
    );

    return (
        <>
            <button onClick={ toggleMenu } aria-label="menu"><Icon name="menu" /></button>
            <ul
              className={ cx(styles.menu, { [styles.opened]: menuOpened }) }
              role="menu"
            >
                { Object.values(menu).map((i) => renderMenuItem(i, 0)) }
            </ul>
        </>

    );
}

export default MenuComponent;
