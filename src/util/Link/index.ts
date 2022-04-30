import { NextRouter } from 'next/router';

const hrefDoctor = (href?: string) => {
    if (!href) {
        return '/';
    }
    if (href.startsWith('/')) {
        return href;
    }

    return `/${href}`;
};

const removeParamsIfEmpty = (query: NextRouter['query'], params: object) => Object.entries({ ...query, ...params })
    .reduce((acc, [key, value]) => {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && !params[key]) {
            return acc;
        }

        acc[key] = value;

        return acc;
    }, {});

const setUrlQuery = (router: NextRouter, params: object = {}) => {
    const {
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
    ).catch(() => {});
};

export const getSelectedFiltersFromUrl = (customFilters: string) => {
    const selectedFiltersString = (customFilters || '').split(';');

    return selectedFiltersString.reduce((acc, filter) => {
        if (!filter) {
            return acc;
        }
        const [key, value] = filter.split(':');
        return {
            ...acc,
            [key]: value.split(',')
        };
    }, {}) as object;
};

const _getNewSelectedFiltersString = (filterName: string, filterArray: (string | number)[], prev: object = {}) => {
    const customFilers = {
        ...prev,
        [filterName]: filterArray
    };

    return Object.entries(customFilers)
        .reduce((accumulator, [filterKey, filterValue]) => {
            if (filterValue.length) {
                const filterValues = filterValue.sort()
                    .join(',');

                accumulator.push(`${filterKey}:${filterValues}`);
            }

            return accumulator as string[];
        }, [])
        .sort()
        .join(';');
};

const setFilterAttribute = (router: NextRouter, {
    code,
    value
}: { code: string, value: string | number }) => {
    const { query: { customFilters } } = router;
    if (!customFilters) {
        setUrlQuery(router, {
            customFilters: _getNewSelectedFiltersString(code, [value])
        });
    } else {
        const uriComponent: string = typeof customFilters === 'string' ? customFilters : customFilters[0];
        const selected: object = getSelectedFiltersFromUrl(decodeURIComponent(uriComponent));
        let current = selected[code] as string[];
        if (current) {
            const active: number = current.indexOf(value as string);
            if (active !== -1) {
                current.splice(active, 1);
            } else {
                current.push(value as string);
            }
        } else {
            current = [value as string];
        }
        setUrlQuery(router, {
            customFilters: _getNewSelectedFiltersString(code, current, selected)
        });
    }
};

const configureAttributesForRequest = (customFilters: string) => {
    const selected = getSelectedFiltersFromUrl(decodeURIComponent(customFilters));

    return Object.entries(selected)
        .reduce((acc, [key, value]) => {
            acc[key] = {
                in: value
            };

            return acc;
        }, {});
};

const getIsFilterSelected = (router: NextRouter, {
    code,
    value
}: { code: string, value: string | number }) => {
    const { query: { customFilters } } = router;
    if (!customFilters) {
        return false;
    }
    const uriComponent: string = typeof customFilters === 'string' ? customFilters : customFilters[0];
    const selected = getSelectedFiltersFromUrl(decodeURIComponent(uriComponent));

    const current = selected[code] as string[];

    if (current) {
        return current.indexOf(value as string) !== -1;
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
