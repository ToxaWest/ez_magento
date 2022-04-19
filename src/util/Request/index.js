/** @namespace Request/debounce */
export const debounce = (callback, delay) => {
    // eslint-disable-next-line fp/no-let
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), delay);
    };
};

export const makeCancelable = (promise) => {
    // eslint-disable-next-line fp/no-let
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            (val) => (!hasCanceled_ && resolve(val)),
            (error) => (!hasCanceled_ && reject(error))
        );
    });

    return {
        cancel() {
            hasCanceled_ = true;
        },
        promise: wrappedPromise
    };
};

export const getErrorMessage = (e) => {
    if (e.graphQLErrors?.[0]) {
        return e.graphQLErrors[0].message;
    }
    // eslint-disable-next-line no-console
    console.error(e);
    return '';
};
