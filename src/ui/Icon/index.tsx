import styles from './Icon.module.scss';

import { createElement, ReactElement } from 'react';

function Icon({ name }: { name: string }): ReactElement {
    return createElement('span', { className: styles.materialIcons }, name);
}

export default Icon;
