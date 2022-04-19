import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import SelectComponent from './Select.component';

const SelectContainer = (props) => {
    const {
        options: selectOptions,
        onChange,
        className,
        autocomplete,
        placeholder,
        ...inputProps
    } = props;
    const { defaultValue } = props;
    const [opened, setOpen] = useState(false);
    const [label, setLabel] = useState('');
    const [options, setOptions] = useState(selectOptions);

    const optionRef = useRef();
    const inputRef = useRef();

    const setFocus = (childIndex) => {
        optionRef.current.children[childIndex]?.focus();
    };

    useEffect(() => {
        const d = options.find(({ value }) => value === defaultValue);
        if (d) {
            const { label: l, value } = d;
            setLabel(l);
            onChange(value);
        }
    }, [defaultValue]);

    const onClick = (e) => {
        setOpen(false);
        setLabel(options.find(({ value }) => value === e)?.label);
        onChange(e);
    };

    const onKeyDown = (e) => {
        const { keyCode } = e;
        if (keyCode === 9) {
            setOpen(false);
            return;
        }

        if (keyCode === 40) {
            e.preventDefault();
            setOpen(true);
            if (!optionRef.current) {
                return;
            }
            setFocus(0);
            return;
        }
        if (keyCode === 27) {
            e.preventDefault();
            setOpen(false);
        }
    };

    const search = ({ target: { value = '' } }) => {
        setLabel(value);
        const f = selectOptions.filter(
            ({ label }) => label.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );

        if (!value) {
            onClick('');
        }

        if (!opened) {
            setOpen(true);
        }
        setOptions(f);
    };

    const onKeyOptionDown = (e, index, value) => {
        const { keyCode } = e;

        const keys = {
            9: () => setFocus(index + 1),
            13: () => onClick(value),
            27: () => setOpen(false),
            38: () => setFocus(index - 1),
            40: () => setFocus(index + 1)
        };

        if (keys[keyCode]) {
            e.preventDefault();
            keys[keyCode]();
            return;
        }

        inputRef.current.focus();
    };

    const containerProps = {
        onKeyDown,
        onKeyOptionDown,
        search,
        label,
        opened,
        optionRef,
        options,
        onClick,
        defaultValue,
        setOpen,
        autocomplete,
        placeholder,
        inputRef,
        inputProps,
        className
    };

    return <SelectComponent { ...containerProps } />;
};

SelectContainer.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    autocomplete: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired
};
SelectContainer.defaultProps = {
    autocomplete: false,
    className: '',
    defaultValue: '',
    placeholder: '',
    onChange: () => {
    }
};

export default SelectContainer;
