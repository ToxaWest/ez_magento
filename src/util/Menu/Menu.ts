export interface unsortedItemsInterface { parent_id: number, position: number, item_id: number }

export const getSortedItems = (unsortedItems: unsortedItemsInterface[]) => Array.from(unsortedItems)
    .sort((
        { parent_id: PID, position: P },
        { parent_id: prevPID, position: prevP },
    ) => (PID - prevPID) || (P - prevP));

interface checkActiveInterface {
    [key: string]: checkActiveInterface
}

export const checkActive = (items: checkActiveInterface, id: number): boolean => Object.entries(items)
    .some(([parent, current]) => (
        parseInt(parent, 10) === id ? true : checkActive(current, id)
    ));

interface activeItemsInterface {
    [key: string]: activeItemsInterface
}

export const addToActive = (activeItems: activeItemsInterface, id, parent_id) => Object.entries(activeItems)
    .reduce((acc, [parent, current]) => {
        if (parseInt(parent, 10) === parent_id) {
            acc[parent] = { ...current, [id]: {} };
        } else {
            acc[parent] = addToActive(current, id, parent_id);
        }

        return acc;
    }, {});

export const removeFromActive = (activeItems: activeItemsInterface, id) => Object.entries(activeItems)
    .reduce((acc, [parent, current]) => {
        if (parseInt(parent, 10) !== id) {
            acc[parent] = removeFromActive(current, id);
        }

        return acc;
    }, {});

/** @namespace Menu */
export class Menu {
    menu = {};

    menuPositionReference: { [key: string] : (string | number)[] } = {};

    getMenuData(item) {
        return {
            ...item,
            children: {}
        } as object;
    }

    setToValue(obj: object, path: string, value) {
        let i: number;
        // eslint-disable-next-line no-param-reassign
        const p = path.split('.');
        // eslint-disable-next-line fp/no-loops,no-plusplus
        for (i = 0; i < p.length - 1; i++) {
            // eslint-disable-next-line no-param-reassign
            obj = obj[p[i]];
        }
        // eslint-disable-next-line no-param-reassign
        obj[path[i]] = value;
    }

    createItem(data: unsortedItemsInterface) {
        const { parent_id, item_id } = data;
        if (parent_id === 0) {
            this.menuPositionReference[item_id] = [];
            this.menu[item_id] = this.getMenuData(data);
        } else if (this.menuPositionReference[parent_id] !== undefined) {
            this.menuPositionReference[item_id] = [
                ...this.menuPositionReference[parent_id],
                parent_id
            ];

            this.setToValue(
                this.menu,
                `${this.menuPositionReference[item_id].join('.children.')}.children.${item_id}`,
                this.getMenuData(data),
            );
        }
    }

    reduce({ items: unsortedItems } : { items: unsortedItemsInterface[] }) {
        getSortedItems(unsortedItems).forEach((realMenuItem) => {
            this.createItem(realMenuItem);
        });

        return this.menu;
    }
}

export default new Menu();
