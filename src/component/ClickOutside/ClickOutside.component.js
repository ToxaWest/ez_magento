import PropTypes from 'prop-types';
import {
    cloneElement, useRef
} from 'react';

import useOnClickOutside from 'Hook/useOnClickOutside';

/** @namespace Component/ClickOutside/Component */
const ClickOutside = ({ children, onClick }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClick);

    return cloneElement(children, { ref });
};

ClickOutside.defaultProps = {
    children: [],
    onClick: () => {}
};

ClickOutside.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
};

export default ClickOutside;
