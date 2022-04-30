import styles from './Button.module.scss';

import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

const cx = classNames.bind(styles);

interface ButtonInterface extends ButtonHTMLAttributes<object> {
    variant?: 'main' | 'secondary' | 'default',
    className?: string
}

function Button(props: ButtonInterface) {
    const {
        variant,
        className: initialClassName,
        ...nativeProps
    } = props;
    const className = cx(initialClassName, styles[variant]);

    return <button { ...nativeProps } className={ className } />;
}

Button.defaultProps = {
    variant: 'default',
    className: ''
};

export default Button;
