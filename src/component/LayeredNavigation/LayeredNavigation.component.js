import styles from './LayeredNavigation.module.scss';

import ExpandableContent from '@component/ExpandableContent';
import PropTypes from 'prop-types';

import { notInteractiveClick } from 'Util/Events';

function LayeredNavigationComponent(props) {
    const { aggregations, onSelect, isSelected } = props;

    const renderOption = (option, code) => {
        const { value, label, count } = option;
        return (
            <li
              key={ value }
              role="option"
              tabIndex={ 0 }
              aria-selected={ isSelected(code, value) }
              onKeyDown={ notInteractiveClick }
              onClick={ () => onSelect(code, value) }
            >
                { `${label} (${count})` }
                { isSelected(code, value) && <span> x</span> }
            </li>
        );
    };

    const renderAttribute = (item) => {
        const {
            label, count, attribute_code, options
        } = item;

        return (
            <div key={ attribute_code }>
                <ExpandableContent
                  heading={ `${label} (${count})` }
                >
                    <ul>
                        { options.map((option) => renderOption(option, attribute_code)) }
                    </ul>
                </ExpandableContent>
            </div>
        );
    };

    return (
        <aside className={ styles.wrapper }>
            { aggregations.map(renderAttribute) }
        </aside>
    );
}

LayeredNavigationComponent.propTypes = {
    aggregations: PropTypes.arrayOf(PropTypes.shape({
        attribute_code: PropTypes.string,
        count: PropTypes.number,
        label: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            count: PropTypes.number,
            label: PropTypes.string,
            value: PropTypes.string
        }))
    })).isRequired,
    isSelected: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default LayeredNavigationComponent;
