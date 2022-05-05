import styles from './Icon.module.scss';

import { createElement } from 'react';

function Icon({ name }: { name: string }) {
    return createElement('span', { className: styles.materialIcons }, name);
}

export default Icon;
