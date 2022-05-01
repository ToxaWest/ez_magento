import MenuComponent from '@component/Menu/Menu.component';
import { RootState } from '@store/index';
import { addToActive, checkActive, removeFromActive } from '@util/Menu';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function MenuContainer({ identifier }: { identifier: string }) {
    const { [identifier]: menu } = useSelector((state: RootState) => state.config.menu);

    const [activeItems, setActive] = useState({});
    if (!menu) {
        return null;
    }

    const isActive = (id: number) => checkActive(activeItems, id);

    const toggle = (id: number, parent_id) => {
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

export default MenuContainer;
