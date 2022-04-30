import Image from '@component/Image';
import Link from '@component/Link';
import WidgetFactory from '@component/WidgetFactory';
import { Element } from 'domhandler';
import parser, { attributesToProps, DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import { Attributes } from 'html-react-parser/lib/attributes-to-props';
import { createElement, ReactElement } from 'react';

function HtmlContainer({ content }: { content?: string }) {
    if (!content) {
        return null;
    }

    const nameMap = {
        widget: {
            render: (attribs: Attributes) => {
                const props = attributesToProps(attribs) as object;
                return createElement(WidgetFactory, props as WidgetFactoryInterface);
            }
        },
        img: {
            render: (attribs: Attributes) => {
                const props = attributesToProps(attribs) as object;
                return createElement(Image, props);
            }
        },
        a: {
            render: (attribs: Attributes) => {
                const props = attributesToProps(attribs) as object;
                return createElement(Link, props);
            }
        }
    };

    const options: HTMLReactParserOptions = {
        trim: true,
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                const {
                    attribs,
                    name
                } = domNode;

                if (attribs && nameMap[name]) {
                    const { render } = nameMap[name];
                    return render(attribs) as ReactElement;
                }
            }

            return domNode;
        }
    };

    return parser(content, options) as ReactElement;
}

HtmlContainer.defaultProps = {
    content: ''
};

export default HtmlContainer;
