import styles from './Select.module.scss';

import ClickOutside from '@component/ClickOutside';
import classNames from 'classnames';
import React from 'react';

const cx = classNames.bind(styles);

interface SelectComponentInterface extends SelectAbstractInterface {
    opened: boolean,
    optionRef: React.LegacyRef<HTMLUListElement>
    inputRef: React.LegacyRef<HTMLInputElement>,
    onClick: (value: number | string) => void,
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>,
    onKeyOptionDown: (e: React.KeyboardEvent<HTMLLIElement>, index: number, value: number | string) => void,
    setOpen: (open: boolean) => void,
    search: React.ChangeEventHandler,
    inputProps: object,
    label?: string
}

function SelectComponent(props: SelectComponentInterface) {
    const {
        opened,
        optionRef,
        options,
        onClick,
        defaultValue,
        onKeyDown,
        onKeyOptionDown,
        setOpen,
        autocomplete,
        placeholder,
        search,
        inputRef,
        inputProps,
        className,
        label
    } = props;

    const renderOptions = () => {
        if (!opened) {
            return null;
        }

        return (
            <div>
                <ul className={ styles.options } ref={ optionRef }>
                    { options.map(({ value, label: optionLabel }, index) => (
                        <li
                          key={ value }
                          aria-label="option"
                          onClick={ () => onClick(value) }
                          role="option"
                          aria-selected={ value === defaultValue }
                          className={ cx(
                              styles.listItem,
                              { [styles.listItemActive]: value === defaultValue },
                          ) }
                          tabIndex={ -1 }
                          onKeyDown={ (e) => onKeyOptionDown(e, index, value) }
                        >
                            <span>{ optionLabel }</span>
                        </li>
                    )) }
                </ul>
            </div>
        );
    };

    return (
        <ClickOutside onClick={ () => setOpen(false) }>
            <div className={ cx(styles.wrapper, className) }>
                <input type="hidden" { ...inputProps } defaultValue={ defaultValue } />
                <input
                  onClick={ () => setOpen(!opened) }
                  value={ label }
                  onChange={ search }
                  onKeyDown={ onKeyDown }
                  ref={ inputRef }
                  placeholder={ placeholder }
                  autoComplete="new-password"
                  className={ cx(
                      styles.mainInput,
                      {
                          [styles.mainInputReadOnly]: !autocomplete
                      }
                  ) }
                  readOnly={ !autocomplete }
                />
                { renderOptions() }
            </div>
        </ClickOutside>
    );
}

SelectComponent.defaultProps = {
    label: ''
};

export default SelectComponent;