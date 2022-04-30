import useOnClickOutside from '@hook/useOnClickOutside';
import {
    cloneElement, ReactElement, useRef
} from 'react';

interface ClickOutsideInterface {
    children: ReactElement,
    onClick: (e: MouseEvent) => void
}

const ClickOutside = ({ children, onClick }: ClickOutsideInterface): ReactElement => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClick);

    return cloneElement(children, { ref });
};

ClickOutside.defaultProps = {
    children: [],
    onClick: () => {}
};

export default ClickOutside;
