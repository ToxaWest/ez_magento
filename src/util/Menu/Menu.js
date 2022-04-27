/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/**
 * Given an array of menu items, returns a copy of the array, sorted by their parent ID, then by their sort order (position)
 *
 * @param unsortedItems an array of items to be sorted
 * @returns {array} the sorted array
 * @namespace /Menu/getSortedItems
 */
export const getSortedItems = (unsortedItems) => Array.from(unsortedItems).sort((
    { parent_id: PID, position: P },
    { parent_id: prevPID, position: prevP }
) => (PID - prevPID) || (P - prevP));

export const checkActive = (items, id) => Object.entries(items).some(([parent, current]) => (
    parseInt(parent, 10) === id ? true : checkActive(current, id)
));

export const addToActive = (activeItems, id, parent_id) => Object.entries(activeItems)
    .reduce((acc, [parent, current]) => {
        if (parseInt(parent, 10) === parent_id) {
            acc[parent] = { ...current, [id]: {} };
        } else {
            acc[parent] = addToActive(current, id, parent_id);
        }

        return acc;
    }, {});

export const removeFromActive = (activeItems, id) => Object.entries(activeItems).reduce((acc, [parent, current]) => {
    if (parseInt(parent, 10) !== id) {
        acc[parent] = removeFromActive(current, id);
    }

    return acc;
}, {});

/** @namespace Menu */
export class Menu {
    getMenuData(item) {
        return {
            ...item,
            children: {}
        };
    }

    setToValue(obj, path, value) {
        let i;
        // eslint-disable-next-line no-param-reassign
        path = path.split('.');
        // eslint-disable-next-line fp/no-loops,no-plusplus
        for (i = 0; i < path.length - 1; i++) {
            // eslint-disable-next-line no-param-reassign
            obj = obj[path[i]];
        }
        // eslint-disable-next-line no-param-reassign
        obj[path[i]] = value;
    }

    createItem(data) {
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
                this.getMenuData(data)
            );
        }
    }

    reduce({ items: unsortedItems }) {
        this.menu = {};
        this.menuPositionReference = {};

        getSortedItems(unsortedItems).forEach((realMenuItem) => {
            this.createItem(realMenuItem);
        });

        return this.menu;
    }
}

export default new Menu();
