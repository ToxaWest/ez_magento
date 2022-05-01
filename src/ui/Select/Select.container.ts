import {
    ChangeEvent, createElement,
    KeyboardEvent,
    KeyboardEventHandler, ReactElement,
    useEffect, useRef, useState
} from 'react';

import SelectComponent from './Select.component';

interface SelectContainerInterface extends SelectAbstractInterface {
    onChange?: (value: string | number) => void,
}
function SelectContainer(props: SelectContainerInterface): ReactElement {
    const {
        options: selectOptions,
        onChange,
        className = '',
        autocomplete = false,
        placeholder = '',
        ...inputProps
    } = props;

    const { defaultValue = '' } = props;
    const [opened, setOpen] = useState<boolean>(false);
    const [label, setLabel] = useState<string>('');
    const [options, setOptions] = useState<SelectOptions[]>(selectOptions);

    const optionRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>();

    const setFocus = (childIndex: number) => {
        const child = optionRef.current.children[childIndex] as HTMLElement;
        if (child) {
            child.focus({
                preventScroll: true
            });
        }
    };

    useEffect(() => {
        const d = options.find(({ value }) => value === defaultValue);
        if (d) {
            const {
                label: l,
                value
            } = d;

            setLabel(l);
            onChange(value);
        }
    }, [defaultValue]);

    const onClick = (e: string | number) => {
        setOpen(false);
        setLabel(options.find(({ value }) => value === e)?.label);
        onChange(e);
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
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

    const search = ({ target: { value = '' } } : ChangeEvent<HTMLInputElement>) => {
        setLabel(value);
        const f = selectOptions.filter(
            ({ label: fLabel }) => fLabel.toLowerCase()
                .indexOf(value.toLowerCase()) !== -1
        );

        if (!value) {
            onClick('');
        }

        if (!opened) {
            setOpen(true);
        }
        setOptions(f);
    };

    const onKeyOptionDown:(
        e: KeyboardEvent<HTMLLIElement>,
        index: number,
        value: number | string
    ) => void = (e, index, value) => {
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

        inputRef.current.focus({
            preventScroll: true
        });
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

    return createElement(SelectComponent, containerProps);
}

SelectContainer.defaultProps = {
    onChange: () => {
    }
};

export default SelectContainer;
