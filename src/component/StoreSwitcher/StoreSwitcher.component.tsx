import styles from './StoreSwitcher.module.scss';

import Select from '@ui/Select';

interface StoreSwitcherComponentInterface {
    currentStore: string,
    handleChange: (locale: string) => void,
    storeList: { label: string, value: string }[]
}

function StoreSwitcherComponent(props: StoreSwitcherComponentInterface) {
    const { currentStore, handleChange, storeList } = props;
    return (
        <Select
          className={ styles.wrapper }
          onChange={ handleChange }
          options={ storeList }
          defaultValue={ currentStore }
        />
    );
}

StoreSwitcherComponent.propTypes = {

};

export default StoreSwitcherComponent;
