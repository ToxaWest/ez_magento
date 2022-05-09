import Image from '@component/Image';
import Link from '@component/Link';
import WidgetFactory from '@component/WidgetFactory';
import { Element, Text } from 'domhandler';
import parser, {
    attributesToProps, DOMNode, domToReact, HTMLReactParserOptions
} from 'html-react-parser';
import { createElement, ReactElement } from 'react';

function HtmlContainer({ content }: { content?: string }) {
    if (!content) {
        return null;
    }

    const parserOptions: {
        nameMap: { [key: string]: { render: (Element: Element) => ReactElement | null } },
        options: HTMLReactParserOptions
    } = {
        nameMap: {
            widget: {
                render: ({ attribs }) => {
                    const props = attributesToProps(attribs) as object;
                    return createElement(WidgetFactory, props as WidgetFactoryInterface);
                }
            },
            img: {
                render: ({ attribs }) => {
                    const props = attributesToProps(attribs) as object;
                    return createElement(Image, props);
                }
            },
            a: {
                render: ({ attribs }) => {
                    const props = attributesToProps(attribs) as object;
                    return createElement(Link, props);
                }
            },
            p: {
                render: ({ attribs, children }) => {
                    if (children.length) {
                        const props = attributesToProps(attribs) as object;
                        const tag = children.length === 1 && children[0] instanceof Text ? 'p' : 'div';
                        return createElement(tag, props, domToReact(children, parserOptions.options));
                    }

                    return null;
                }
            }
        },
        options: {
            trim: true,
            replace: (domNode: DOMNode) => {
                if (domNode instanceof Element) {
                    const {
                        attribs,
                        name
                    } = domNode;

                    if (attribs && parserOptions.nameMap[name]) {
                        const { render } = parserOptions.nameMap[name];
                        return render(domNode);
                    }
                }

                return domNode;
            }
        }
    };

    return parser(content, parserOptions.options) as ReactElement;
}

HtmlContainer.defaultProps = {
    content: ''
};

export default HtmlContainer;
