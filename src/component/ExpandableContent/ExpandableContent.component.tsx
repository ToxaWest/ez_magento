import styles from './ExpandableContent.module.scss';

import Icon from '@ui/Icon';
import classNames from 'classnames';
import React, { ReactElement, useState } from 'react';

const cx = classNames.bind(styles);

interface ExpandableContentComponentInterface {
    children: ReactElement[] | ReactElement,
    contentWrapperTag?,
    heading: string,
    isExpanded?: boolean
}

function ExpandableContentComponent(props: ExpandableContentComponentInterface): ReactElement {
    const {
        children, contentWrapperTag, heading, isExpanded
    } = props;
    const [opened, setOpened] = useState(isExpanded);

    const onClick = (): void => {
        setOpened(!opened);
    };

    if (!children) {
        return <span>{ heading }</span>;
    }

    const getContentChild = ():ReactElement => {
        const Tag = contentWrapperTag;
        return (
            <Tag
              className={ cx(
                  styles.content,
                  { [styles.content_active]: opened },
              ) }
            >
                { children }
            </Tag>
        );
    };

    const renderHeading = (): ReactElement => (
        <button
          className={ cx(
              styles.heading,
              { [styles.active]: opened },
          ) }
          onClick={ onClick }
        >
            { heading }
            <Icon name={ opened ? 'expand_less' : 'expand_more' } />
        </button>
    );

    return (
        <>
            { renderHeading() }
            { getContentChild() }
        </>
    );
}

ExpandableContentComponent.defaultProps = {
    contentWrapperTag: 'div',
    isExpanded: false
};

export default ExpandableContentComponent;
