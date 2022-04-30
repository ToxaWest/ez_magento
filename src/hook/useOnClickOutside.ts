import { RefObject, useEffect } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void) => {
    useEffect(
        () => {
            const listener = (event: MouseEvent) => {
                const e = event.target as Node;
                if (!ref.current || ref.current.contains(e)) {
                    return;
                }
                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },

        [ref, handler],
    );
};

export default useOnClickOutside;
