export const _normalizeBreadcrumb = (breadcrumbs?: CategoryBreadcrumbsInterface[]): BreadcrumbInterface[] => (
    breadcrumbs || []).map(
    ({ category_name, category_url }) => (
        { name: category_name, url: category_url })
);

export const getBreadcrumbs = (categories: CategoryInterface[]): BreadcrumbInterface[] => categories
    .reduce((acc: BreadcrumbInterface[], { breadcrumbs }) => {
        if (breadcrumbs && breadcrumbs.length > acc.length) {
            return _normalizeBreadcrumb(breadcrumbs);
        }

        return acc;
    }, []);

export const getBreadcrumbsBasedOnPrevPath = (categories: CategoryInterface[]) => categories.find(
    ({ breadcrumbs }) => {
        if (breadcrumbs && breadcrumbs.length) {
            return breadcrumbs[breadcrumbs.length - 1].category_url === global.prevPath;
        }

        return false;
    }
);

export const getProductsBreadcrumbs = (categories: CategoryInterface[]) : BreadcrumbInterface[] => {
    if (typeof global !== 'undefined') {
        if (global.prevPath) {
            const cat = getBreadcrumbsBasedOnPrevPath(categories);
            if (cat) {
                return _normalizeBreadcrumb(cat.breadcrumbs);
            }
        }
    }

    return getBreadcrumbs(categories);
};
