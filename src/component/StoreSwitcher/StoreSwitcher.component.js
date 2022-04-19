import styles from './StoreSwitcher.module.scss';

import PropTypes from 'prop-types';

import Select from 'Component/Select';

const StoreSwitcherComponent = (props) => {
    const { storeList, handleChange, currentStore } = props;
    return (
        <Select
          className={ styles.wrapper }
          onChange={ handleChange }
          options={ storeList }
          defaultValue={ currentStore }
        />
    );
};

StoreSwitcherComponent.propTypes = {
    currentStore: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    storeList: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })).isRequired
};

export default StoreSwitcherComponent;
