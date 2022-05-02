import styles from './LayeredNavigation.module.scss';

import ExpandableContent from '@component/ExpandableContent';
import { notInteractiveClick } from '@util/Events';

interface LayeredNavigationComponentInterface {
    aggregations: AggregationsInterface[]
    isSelected: (code:string, value: string | number) => boolean,
    onSelect: (code:string, value: string | number) => void
}

function LayeredNavigationComponent(props: LayeredNavigationComponentInterface) {
    const {
        aggregations,
        onSelect,
        isSelected
    } = props;

    const renderOption = (option: AggregationOptionInterface, code: string) => {
        const {
            value,
            label,
            count
        } = option;

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

    const renderAttribute = (item: AggregationsInterface) => {
        const {
            label,
            count,
            attribute_code,
            options
        } = item;

        return (
            <div key={ attribute_code }>
                <ExpandableContent
                  heading={ `${label} (${count})` }
                >
                    <ul role="listbox" aria-label="Layer Navigation options">
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

export default LayeredNavigationComponent;
