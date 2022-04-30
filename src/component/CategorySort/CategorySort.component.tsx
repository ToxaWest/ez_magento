import Select from '@ui/Select';

interface CategorySortComponentInterface {
    defaultSort: string,
    onSortChange: (value: string) => void,
    options: { label: string, value: string }[]
}

function CategorySortComponent(props: CategorySortComponentInterface) {
    const { options, onSortChange, defaultSort } = props;
    return (
        <Select
          options={ options }
          defaultValue={ defaultSort }
          onChange={ onSortChange }
        />
    );
}

export default CategorySortComponent;
