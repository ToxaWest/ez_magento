import { MenuInterface } from '@store/config';

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

export const normalizeMenu = ({ items }: { items: unsortedItemsInterface[] }): MenuInterface => {
    const getChild = (parentItem) => getSortedItems(items).reduce((acc, item) => {
        if (acc.children) {
            if (acc.item_id === item.parent_id.toString()) {
                acc.children[item.item_id] = getChild(item);
            }
        }

        return acc;
    }, { ...parentItem, children: {} } as MenuInterface);

    const result = items.find(({ parent_id }) => parent_id === 0);

    return getChild(result);
};
