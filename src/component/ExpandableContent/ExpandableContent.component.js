import styles from './ExpandableContent.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ExpandableContentComponent = (props) => {
    const {
        children, isExpanded, contentWrapperTag, heading
    } = props;
    const [opened, setOpened] = useState(isExpanded);

    const onClick = () => {
        setOpened(!opened);
    };

    if (children.length === 0) {
        return heading;
    }

    const getContentChild = () => {
        const Tag = contentWrapperTag;
        return (
            <Tag
              className={ cx(
                  styles.content,
                  { [styles.content_active]: opened }
              ) }
            >
                { children }
            </Tag>
        );
    };

    const renderHeading = () => (
        <button
          className={ cx(
              styles.heading,
              { [styles.active]: opened }
          ) }
          onClick={ onClick }
        >
            { heading }
        </button>
    );

    return (
        <>
            { renderHeading() }
            { getContentChild() }
        </>
    );
};

ExpandableContentComponent.defaultProps = {
    contentWrapperTag: 'div',
    isExpanded: false
};

ExpandableContentComponent.propTypes = {
    children: PropTypes.node.isRequired,
    contentWrapperTag: PropTypes.string,
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isExpanded: PropTypes.bool
};

export default ExpandableContentComponent;
