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

import styles from './Loader.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

const cx = classNames.bind(styles);
/**
 * Loader component
 * Loaders overlay to identify loading
 * @class Loader
 * @namespace Component/Loader/Component
 */
export class Loader extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isMain: PropTypes.bool
    };

    static defaultProps = {
        isMain: false
    }

    renderMain() {
        return (
          <div className={ styles.LoaderMain }>
            <span />
          </div>
        );
    }

    render() {
        const { isLoading, isMain } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
          <div className={ cx(
              styles.Loader,
              {
                  [styles.Loader_isMain]: isMain
              }
          ) }
          >
            <div className={ styles.LoaderScale }>
              { this.renderMain() }
            </div>
          </div>
        );
    }
}

export default Loader;
