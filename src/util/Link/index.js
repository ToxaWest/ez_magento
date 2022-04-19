const hrefDoctor = (href) => {
    if (!href) {
        return '/';
    }
    if (href.startsWith('/')) {
        return href;
    }

    return `/${ href}`;
};

const removeParamsIfEmpty = (query, params) => Object.entries({ ...query, ...params })
    .reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && !params[key]) {
            return acc;
        }

        acc[key] = value;

        return acc;
    }, {});

const setUrlQuery = (router, params = {}) => {
    const {
        // eslint-disable-next-line no-unused-vars
        all,
        ...query
    } = router.query;
    const p = removeParamsIfEmpty(query, params);

    router.push(
        {
            pathname: router.asPath.split('?')[0],
            query: {
                ...p
            }
        }
    );
};

export const getSelectedFiltersFromUrl = (customFilters) => {
    const selectedFiltersString = (customFilters || '').split(';');

    return selectedFiltersString.reduce((acc, filter) => {
        if (!filter) {
            return acc;
        }
        const [key, value] = filter.split(':');
        return { ...acc, [key]: value.split(',') };
    }, {});
};

const _getNewSelectedFiltersString = (filterName, filterArray, prev = {}) => {
    const customFilers = {
        ...prev,
        [filterName]: filterArray
    };

    return Object.entries(customFilers)
        .reduce((accumulator, [filterKey, filterValue]) => {
            if (filterValue.length) {
                const filterValues = filterValue.sort().join(',');

                accumulator.push(`${filterKey}:${filterValues}`);
            }

            return accumulator;
        }, [])
        .sort()
        .join(';');
};

const setFilterAttribute = (router, { code, value }) => {
    const { query: { customFilters } } = router;
    if (!customFilters) {
        setUrlQuery(router, {
            customFilters: _getNewSelectedFiltersString(code, [value])
        });
    } else {
        const selected = getSelectedFiltersFromUrl(decodeURIComponent(customFilters));
        if (selected[code]) {
            const active = selected[code].indexOf(value);
            if (active !== -1) {
                selected[code].splice(active, 1);
            } else {
                selected[code].push(value);
            }
        } else {
            selected[code] = [value];
        }
        setUrlQuery(router, {
            customFilters: _getNewSelectedFiltersString(code, selected[code], selected)
        });
    }
};

const configureAttributesForRequest = (customFilters) => {
    const selected = getSelectedFiltersFromUrl(decodeURIComponent(customFilters));

    return Object.entries(selected).reduce((acc, [key, value]) => {
        acc[key] = {
            in: value
        };

        return acc;
    }, {});
};

const getIsFilterSelected = (router, { code, value }) => {
    const { query: { customFilters } } = router;
    if (!customFilters) {
        return false;
    }
    const selected = getSelectedFiltersFromUrl(decodeURIComponent(customFilters));

    if (selected[code]) {
        return selected[code].indexOf(value) !== -1;
    }

    return false;
};

export {
    getIsFilterSelected,
    configureAttributesForRequest,
    setFilterAttribute,
    setUrlQuery,
    hrefDoctor
};
