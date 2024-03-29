import { ApolloError } from '@apollo/client';

interface MakeCancelable<T> {
    cancel: () => void,
    promise: Promise<T>
}

export function makeCancelable<T>(promise: Promise<Awaited<T>>): MakeCancelable<T> {
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
}

export const getErrorMessage = (e: ApolloError): string => {
    // eslint-disable-next-line no-console
    console.error(e);
    if (e.graphQLErrors?.[0]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return e.graphQLErrors[0].message as string;
    }
    if (e.networkError) {
        // eslint-disable-next-line no-console
        console.error(e.networkError.cause);
    }

    return '';
};
