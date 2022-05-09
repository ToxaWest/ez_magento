import styles from './Button.module.scss';

import classNames from 'classnames';
import {
    ButtonHTMLAttributes, createElement
} from 'react';

const cx = classNames.bind(styles);

interface ButtonInterface extends ButtonHTMLAttributes<object> {
    variant?: 'main' | 'secondary' | 'default' | string
}

function Button(props: ButtonInterface) {
    const {
        className: initialClassName = '',
        variant,
        ...nativeProps
    } = props;
    const className = cx(initialClassName, styles[variant]);

    return createElement('button', {
        ...nativeProps,
        className
    });
}

Button.defaultProps = {
    variant: 'default'
};

export default Button;
