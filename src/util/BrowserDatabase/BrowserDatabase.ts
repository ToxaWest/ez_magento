/**
 * Set of helpers related to Browser Database
 * @class CSS
 * @namespace BrowserDatabase
 */
export class BrowserDatabase {
    /**
     * Loads data from browser storage
     * @param {String} location Name of the local storage
     * @return {Object} Object stored in a specified path
     * @memberof BrowserDatabase
     */
    getItem(location: string) {
        try {
            const entryObject = JSON.parse(localStorage.getItem(location));
            const { data, expiration, createdAt } = entryObject;
            const MILLISECONDS_TO_SECONDS = 1000;

            if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
                localStorage.removeItem(location);
                return null;
            }

            return data as object | string | number;
        } catch {
            return null;
        }
    }

    /**
     * Save data to local storage
     * @param {Object | String | Number | Array} data The value to save to local storage
     * @param {String} location Name of the local storage
     * @param {Number} expiration Time to store entry (in seconds)
     * @memberof BrowserDatabase
     */
    setItem(data, location: string, expiration?: number) {
        localStorage.setItem(location, JSON.stringify({
            createdAt: Date.now(),
            data,
            expiration
        }));
    }

    /**
     * Delete item from local storage
     * @param {String} location
     * @memberof BrowserDatabase
     */
    deleteItem(location: string) {
        localStorage.removeItem(location);
    }
}

export default new BrowserDatabase();
