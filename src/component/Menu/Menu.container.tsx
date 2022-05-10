import MenuComponent from '@component/Menu/Menu.component';
import { RootState } from '@store/index';
import {
    ActiveMenuItems, addToActive, checkActive, removeFromActive
} from '@util/Menu';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

function MenuContainer({ identifier }: { identifier: string }): ReactElement {
    const { [identifier]: menu } = useSelector((state: RootState) => state.config.menu);

    const [activeItems, setActive] = useState<ActiveMenuItems>({});
    const [menuOpened, toggleMenu] = useState<boolean>(false);
    if (!menu) {
        return null;
    }

    const isActive = (id: number): boolean => checkActive(activeItems, id);

    const toggle = (id: number, parent_id: number): void => {
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
        toggleMenu: () => toggleMenu(!menuOpened),
        menuOpened,
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
