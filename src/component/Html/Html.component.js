/* eslint-disable react/jsx-no-useless-fragment */
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

/* eslint-disable consistent-return */
// Disabled due `domToReact` internal logic

import { attributesToPropsWidget } from '@component/Html/Html.config';
import Image from '@component/Image';
import Link from '@component/Link';
import WidgetFactory from '@component/WidgetFactory';
import parser, { attributesToProps, domToReact } from 'html-react-parser';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 * @namespace Component/Html/Component
 */
export class Html extends PureComponent {
    static propTypes = {
        content: PropTypes.string
    };

    static defaultProps = {
        content: ''
    }

    rules = [
        {
            query: { name: ['widget'] },
            replace: this.replaceWidget
        },
        {
            query: { name: ['a'] },
            replace: this.replaceLinks
        },
        {
            query: { name: ['img'] },
            replace: this.replaceImages
        },
        {
            query: { name: ['input'] },
            replace: this.replaceInput
        },
        {
            query: { name: ['table'] },
            replace: this.wrapTable
        }
    ];

    parserOptions = {
        // eslint-disable-next-line react/no-unstable-nested-components
        replace: (domNode) => {
            const { data, name: domName, attribs: domAttrs } = domNode;

            // Let's remove empty text nodes
            if (data && !data.replace(/\u21b5/g, '').replace(/\s/g, '').length) {
                return <></>;
            }

            const rule = this.rules.find((rule) => {
                const { query: { name, attribs } } = rule;

                if (name && domName && name.indexOf(domName) !== -1) {
                    return true;
                } if (attribs && domAttrs) {
                    // eslint-disable-next-line fp/no-loops, fp/no-let,no-plusplus
                    for (let i = 0; i < attribs.length; i++) {
                        const attrib = attribs[i];

                        if (typeof attrib === 'object') {
                            const queryAttrib = Object.keys(attrib)[0];

                            if (Object.prototype.hasOwnProperty.call(domAttrs, queryAttrib)) {
                                return domAttrs[queryAttrib].match(Object.values(attrib)[0]);
                            }
                        } else if (Object.prototype.hasOwnProperty.call(domAttrs, attrib)) {
                            return true;
                        }
                    }
                }

                return false;
            });

            if (rule) {
                const { replace } = rule;
                return replace.call(this, domNode);
            }
        }
    };

    /**
     * Replace links to native React Router links
     * @param  {{ attribs: Object, children: Array }}
     * @return {void|JSX} Return JSX if link is allowed to be replaced
     * @memberof Html
     */
    replaceLinks({ attribs, children }) {
        const { href, ...attrs } = attribs;

        if (href) {
            const isAbsoluteUrl = (value) => /^(?:[a-z]+:)?\/\//i.test(value);
            const isSpecialLink = (value) => /^(sms|tel|mailto):/i.test(value);

            if (!isAbsoluteUrl(href) && !isSpecialLink(href)) {
                return (
                    <Link { ...attributesToProps({ ...attrs, to: href }) }>
                        { domToReact(children, this.parserOptions) }
                    </Link>
                );
            }
        }
    }

    /**
     * Replace img to React Images
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceImages({ attribs }) {
        const attributes = attributesToProps(attribs);

        if (attribs.src) {
            return <Image { ...attributes } />;
        }
    }

    /**
     * Replace input.
     * @param  {{ attribs: Object }}
     * @return {void|JSX} Return JSX with image
     * @memberof Html
     */
    replaceInput({ attribs }) {
        return <input { ...attributesToProps(attribs) } />;
    }

    /**
     * Wrap table in container
     *
     * @param attribs
     * @param children
     * @returns {*}
     */
    wrapTable({ attribs, children }) {
        return (
            <table { ...attributesToProps(attribs) }>
                { domToReact(children, this.parserOptions) }
            </table>
        );
    }

    /**
     * Insert corresponding widget
     *
     * @param {{ attribs: Object }} { attribs }
     * @returns {null|JSX} Return Widget
     * @memberof Html
     */
    replaceWidget({ attribs }) {
        return <WidgetFactory { ...attributesToPropsWidget(attribs) } />;
    }

    render() {
        const { content } = this.props;
        if (!content) {
            return null;
        }

        return parser(content, this.parserOptions);
    }
}

export default Html;
