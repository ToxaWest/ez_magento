import { menuChildInterface, MenuInterface } from '@store/config';

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

export const getCategoryItem = ({ children, item_id, ...item } : menuChildInterface, parent_id: number) => {
    const _normalizeCategoryChild = (n_children: menuChildInterface[], n_parent_id: number) => n_children
        .reduce((acc, n_item) => {
            const {
                item_id: n_item_id,
                include_in_menu
            } = n_item;

            if (!include_in_menu) {
                return acc;
            }

            return {
                ...acc,
                [n_item_id]: getCategoryItem(n_item, n_parent_id)
            };
        }, {}) as MenuInterface;

    return {
        ...item,
        children: _normalizeCategoryChild(children, item_id),
        item_id: item_id.toString(),
        parent_id
    };
};

export const normalizeCategoryMenu = (categoryMenu: menuChildInterface[]) => {
    const item = categoryMenu[0];

    return [getCategoryItem(item, 0)] as MenuInterface[];
};

export const addBlogToMenu = (
    menu: MenuInterface[],
    {
        mfblog_top_menu_include_categories,
        mfblog_permalink_route,
        mfblog_top_menu_item_text
    } : {
        mfblog_top_menu_include_categories: number,
        mfblog_permalink_route: string,
        mfblog_top_menu_item_text: string
    }
): MenuInterface[] => [...menu, {
    title: mfblog_top_menu_item_text,
    url: `/${ mfblog_permalink_route}`,
    children: [],
    parent_id: null,
    item_id: mfblog_permalink_route,
    include_in_menu: mfblog_top_menu_include_categories
}];
