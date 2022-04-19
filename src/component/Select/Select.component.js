import styles from './Select.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import ClickOutside from 'Component/ClickOutside';

const cx = classNames.bind(styles);

const SelectComponent = (props) => {
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
                    { options.map(({
                        value,
                        label
                    }, index) => (
                        <li
                          key={ value }
                          aria-label="option"
                          onClick={ () => onClick(value) }
                          role="option"
                          aria-selected={ value === defaultValue }
                          className={ cx(
                              styles.listItem,
                              { [styles.listItemActive]: value === defaultValue }
                          ) }
                          tabIndex="-1"
                          onKeyDown={ (e) => onKeyOptionDown(e, index, value) }
                        >
                            <span>{ label }</span>
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
};

SelectComponent.propTypes = {
    opened: PropTypes.bool.isRequired,
    optionRef: PropTypes.shape({}).isRequired,
    inputRef: PropTypes.shape({}).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onKeyOptionDown: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    autocomplete: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    inputProps: PropTypes.shape({}).isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired
};

SelectComponent.defaultProps = {
    label: ''
};

export default SelectComponent;
