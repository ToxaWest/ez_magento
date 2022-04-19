/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Loader = dynamic(() => import('./Loader.component'));
Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isMain: PropTypes.bool
};
export default Loader;
