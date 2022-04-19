export const _normalizeBreadcrumb = (breadcrumbs) => (breadcrumbs || []).map(
    ({ category_name, category_url }) => (
        { name: category_name, url: category_url })
);

export const getBreadcrumbs = (categories) => categories.reduce((acc, { breadcrumbs }) => {
    if (breadcrumbs && breadcrumbs.length > acc.length) {
        return _normalizeBreadcrumb(breadcrumbs);
    }

    return acc;
}, []);

export const getBreadcrumbsBasedOnPrevPath = (categories) => categories.find(
    ({ breadcrumbs }) => {
        if (breadcrumbs && breadcrumbs.length) {
            return breadcrumbs[breadcrumbs.length - 1].category_url === window.prevPath;
        }

        return false;
    }
);

export const getProductsBreadcrumbs = (categories) => {
    if (typeof window !== 'undefined') {
        if (window.prevPath) {
            const cat = getBreadcrumbsBasedOnPrevPath(categories);
            if (cat) {
                return _normalizeBreadcrumb(cat.breadcrumbs);
            }
        }
    }

    return getBreadcrumbs(categories);
};
