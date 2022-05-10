import Select from '@ui/Select';
import { ReactElement } from 'react';

interface CategorySortComponentInterface {
    defaultSort: string,
    onSortChange: (value: string) => void,
    options: { label: string, value: string }[]
}

function CategorySortComponent(props: CategorySortComponentInterface): ReactElement {
    const { defaultSort, onSortChange, options } = props;
    return (
        <Select
          options={ options }
          defaultValue={ defaultSort }
          onChange={ onSortChange }
        />
    );
}

export default CategorySortComponent;
