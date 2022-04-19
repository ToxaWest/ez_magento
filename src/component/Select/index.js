import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Select = dynamic(() => import('./Select.container'));
Select.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired
};
export default Select;
