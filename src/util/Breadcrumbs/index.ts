export const _normalizeBreadcrumb = (breadcrumbs?: {
    category_name: string, category_url: string
}[]) => (
    breadcrumbs || []).map(
    ({
        category_name,
        category_url
    }) => (
        {
            name: category_name,
            url: category_url
        })
);

export const getBreadcrumbs = (categories:
    categoriesInterface[]) => categories.reduce((acc, { breadcrumbs }) => {
        if (breadcrumbs && breadcrumbs.length > acc.length) {
            return _normalizeBreadcrumb(breadcrumbs);
        }

        return acc as [];
    }, []) as { name: string, url: string }[];

export interface categoriesInterface {
    breadcrumbs: { category_name: string, category_url: string }[]
}

export const getBreadcrumbsBasedOnPrevPath = (categories: categoriesInterface[]) => categories.find(
    ({ breadcrumbs }) => {
        if (breadcrumbs && breadcrumbs.length) {
            return breadcrumbs[breadcrumbs.length - 1].category_url === global.prevPath;
        }

        return false;
    }
);

export const getProductsBreadcrumbs = (categories: categoriesInterface[]) => {
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
