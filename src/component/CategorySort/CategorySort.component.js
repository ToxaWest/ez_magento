import PropTypes from 'prop-types';

import Select from 'Ui/Select';

function CategorySortComponent(props) {
    const { options, onSortChange, defaultSort } = props;
    return (
        <Select
          options={ options }
          defaultValue={ defaultSort }
          onChange={ onSortChange }
        />
    );
}

CategorySortComponent.propTypes = {
    defaultSort: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })).isRequired
};

export default CategorySortComponent;
