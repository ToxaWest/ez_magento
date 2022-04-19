import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const ExpandableContent = dynamic(() => import('./ExpandableContent.component'));
ExpandableContent.propTypes = {
    children: PropTypes.node.isRequired,
    contentWrapperTag: PropTypes.string,
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isExpanded: PropTypes.bool
};
export default ExpandableContent;
