import styles from './Menu.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import Link from 'Component/Link';

const cx = classNames.bind(styles);

const MenuComponent = ({ menu, toggle, isActive }) => {
    const renderMenuItem = (item, level) => {
        const {
            children, title, url, item_id, parent_id
        } = item;
        const hasChild = Object.keys(children).length > 0;
        return (
            <li
              key={ item_id }
              className={ cx(
                  styles.menu_item,
                  styles[`level_${level}`]
              ) }
            >
                <Link href={ url }>{ title }</Link>
                { /* eslint-disable-next-line no-use-before-define */ }
                { hasChild && renderChild(Object.values(children), parseInt(item_id, 10), parent_id, level) }
            </li>
        );
    };

    const renderChild = (items, item_id, parent_id, level) => (
        <>
            <button
              onClick={ () => toggle(item_id, parent_id) }
              className={ styles.toggle }
              aria-label="toggle"
            />
            <div className={ cx(styles.child_wrapper) }>
                <ul className={ cx(styles.menu_child,
                    {
                        [styles.menu_child_active]: isActive(item_id)
                    }) }
                >
                { items.map((i) => renderMenuItem(i, level + 1)) }
                </ul>
            </div>
        </>
    );

    return (
        <ul className={ styles.menu }>
          { Object.values(menu).map((i) => renderMenuItem(i, 0)) }
        </ul>
    );
};

MenuComponent.propTypes = {
    isActive: PropTypes.func.isRequired,
    menu: PropTypes.arrayOf(PropTypes.shape({
        children: PropTypes.shape({}),
        item_id: PropTypes.string,
        parent_id: PropTypes.number,
        title: PropTypes.string,
        url: PropTypes.string
    })).isRequired,
    toggle: PropTypes.func.isRequired
};

export default MenuComponent;
