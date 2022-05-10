import styles from './LayeredNavigation.module.scss';

import ExpandableContent from '@component/ExpandableContent';
import Icon from '@ui/Icon';
import { notInteractiveClick } from '@util/Events';
import { ReactElement } from 'react';

interface LayeredNavigationComponentInterface {
    aggregations: AggregationsInterface[]
    isSelected: (code:string, value: string | number) => boolean,
    onSelect: (code:string, value: string | number) => void
}

function LayeredNavigationComponent(props: LayeredNavigationComponentInterface): ReactElement {
    const {
        aggregations,
        isSelected,
        onSelect
    } = props;

    const renderOption = (option: AggregationOptionInterface, code: string): ReactElement => {
        const {
            count,
            label,
            value
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
                { isSelected(code, value) && <Icon name="close" /> }
            </li>
        );
    };

    const renderAttribute = (item: AggregationsInterface): ReactElement => {
        const {
            attribute_code,
            count,
            label,
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
