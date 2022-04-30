/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/unbound-method */
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
import parser, { attributesToProps, DOMNode, domToReact } from 'html-react-parser';
import { PureComponent } from 'react';

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 * @namespace Component/Html/Component
 */
export class Html extends PureComponent<{ content?: string }> {
    static defaultProps = {
        content: ''
    };

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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (data && !data.replace(/\u21b5/g, '').replace(/\s/g, '').length) {
                return <></>;
            }

            const rule = this.rules.find((r) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { query: { name, attribs } } = r;

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                if (name && domName && name.indexOf(domName) !== -1) {
                    return true;
                } if (attribs && domAttrs) {
                    // eslint-disable-next-line fp/no-loops, fp/no-let,no-plusplus,@typescript-eslint/no-unsafe-member-access
                    for (let i = 0; i < attribs.length; i++) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        const attrib = attribs[i];

                        if (typeof attrib === 'object') {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            const queryAttrib = Object.keys(attrib)[0];

                            if (Object.prototype.hasOwnProperty.call(domAttrs, queryAttrib)) {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    replaceLinks({ attribs, children } : { attribs: Record<string, string>, children: DOMNode[] }) {
        const { href, ...attrs } = attribs;

        if (href) {
            const isAbsoluteUrl = (value: string) => /^(?:[a-z]+:)?\/\//i.test(value);
            const isSpecialLink = (value: string) => /^(sms|tel|mailto):/i.test(value);

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
    replaceImages({ attribs }: { attribs: Record<string, string> }) {
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
    replaceInput({ attribs }: { attribs: Record<string, string> }) {
        return <input { ...attributesToProps(attribs) } />;
    }

    /**
     * Wrap table in container
     *
     * @param attribs
     * @param children
     * @returns {*}
     */
    wrapTable({ attribs, children }:{ attribs: Record<string, string>, children: DOMNode[] }) {
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
    replaceWidget({ attribs }: { attribs: Record<string, string> }) {
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
