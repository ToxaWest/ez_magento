/** @namespace Request/debounce */
import { ApolloError } from '@apollo/client';

export const debounce = (callback: () => void, delay: number) => {
    // eslint-disable-next-line fp/no-let
    let timeout: ReturnType<typeof setTimeout>;
    return (...args) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        clearTimeout(timeout);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        timeout = setTimeout(() => callback.apply(context, args), delay);
    };
};

export const makeCancelable = (promise: Promise<Awaited<boolean>[]>) => {
    // eslint-disable-next-line fp/no-let
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve:(val) => void, reject) => {
        promise.then(
            (val) => (!hasCanceled_ && resolve(val)),
            (error) => (!hasCanceled_ && reject(error)),
        );
    });

    return {
        cancel: () => {
            hasCanceled_ = true;
        },
        promise: wrappedPromise
    };
};

export const getErrorMessage = (e: ApolloError) => {
    if (e.graphQLErrors?.[0]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return e.graphQLErrors[0].message as string;
    }
    // eslint-disable-next-line no-console
    console.error(e);
    return '';
};
