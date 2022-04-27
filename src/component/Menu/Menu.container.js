import MenuComponent from '@component/Menu/Menu.component';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { addToActive, checkActive, removeFromActive } from 'Util/Menu/Menu';

function MenuContainer({ identifier }) {
    const { [identifier]: menu } = useSelector((state) => state.config.menu);

    const [activeItems, setActive] = useState({});
    if (!menu) {
        return null;
    }

    const isActive = (id) => checkActive(activeItems, id);

    const toggle = (id, parent_id) => {
        if (activeItems[id]) {
            setActive({});
            return;
        }

        if (parent_id) {
            const itemIsActive = isActive(id);
            if (!itemIsActive) {
                setActive(addToActive(activeItems, id, parent_id));
            } else {
                setActive(removeFromActive(activeItems, id));
            }

            return;
        }
        setActive({ ...activeItems, [id]: {} });
    };

    const componentProps = {
        identifier,
        isActive,
        menu,
        toggle
    };

    return (
      <MenuComponent
        { ...componentProps }
      />
    );
}

MenuContainer.propTypes = {
    identifier: PropTypes.string.isRequired
};

export default MenuContainer;
