export const getSortedItems = (
    unsortedItems: MenuItem[]
): MenuItem[] => Array.from(unsortedItems)
    .sort((
        { parent_id: PID, position: P },
        { parent_id: prevPID, position: prevP },
    ) => (PID - prevPID) || (P - prevP));

export interface ActiveMenuItems {
    [key: string]: ActiveMenuItems
}

export const checkActive = (items: ActiveMenuItems, id: number): boolean => Object.entries(items)
    .some(([parent, current]) => (
        parseInt(parent, 10) === id ? true : checkActive(current, id)
    ));

export const addToActive = (activeItems: ActiveMenuItems, id: number, parent_id: number): ActiveMenuItems => Object
    .entries(activeItems)
    .reduce((acc, [parent, current]) => {
        if (parseInt(parent, 10) === parent_id) {
            acc[parent] = { ...current, [id]: {} };
        } else {
            acc[parent] = addToActive(current, id, parent_id);
        }

        return acc;
    }, {});

export const removeFromActive = (activeItems: ActiveMenuItems, id: number): ActiveMenuItems => Object
    .entries(activeItems)
    .reduce((acc, [parent, current]) => {
        if (parseInt(parent, 10) !== id) {
            acc[parent] = removeFromActive(current, id);
        }

        return acc;
    }, {});

export const normalizeMenu = ({ items }: { items: MenuItem[] }): MenuItem => {
    const getChild = (parentItem): MenuItem => getSortedItems(items).reduce((acc, item) => {
        if (acc.children) {
            if (acc.item_id === item.parent_id.toString()) {
                acc.children[item.item_id] = getChild(item);
            }
        }

        return acc;
    }, { ...parentItem, children: {} } as MenuItem);

    const result = items.find(({ parent_id }) => parent_id === 0);

    return getChild(result);
};

export const getCategoryItem = ({
    children, item_id, ...item
} : CategoryMenuInitial, parent_id: number): MenuItem => {
    const _normalizeCategoryChild = (
        n_children: CategoryMenuInitial[],
        n_parent_id: number
    ): MenuChildItems => n_children
        .reduce((acc, n_item) => {
            const { include_in_menu, item_id: n_item_id } = n_item;

            if (!include_in_menu) {
                return acc;
            }

            return { ...acc, [n_item_id]: getCategoryItem(n_item, n_parent_id) };
        }, {});

    return {
        ...item,
        children: _normalizeCategoryChild(children, item_id),
        item_id: item_id.toString(),
        parent_id
    };
};

export const normalizeCategoryMenu = (categoryMenu: CategoryMenuInitial[]): MenuItem[] => {
    const item = categoryMenu[0];

    return [getCategoryItem(item, 0)];
};

export const addBlogToMenu = (
    menu: MenuItem[],
    {
        mfblog_permalink_route,
        mfblog_top_menu_include_categories,
        mfblog_top_menu_item_text
    } : {
        mfblog_permalink_route: string,
        mfblog_top_menu_include_categories: number,
        mfblog_top_menu_item_text: string
    }
): MenuItem[] => [...menu, {
    title: mfblog_top_menu_item_text,
    url: `/${ mfblog_permalink_route}`,
    children: {},
    parent_id: null,
    item_id: mfblog_permalink_route,
    include_in_menu: mfblog_top_menu_include_categories
}];
