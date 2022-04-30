import styles from './Slider.module.scss';

import { notInteractiveClick } from '@util/Events';
import classNames from 'classnames';
import {
    ReactElement, useEffect, useRef, useState
} from 'react';
import Draggable from 'react-draggable';

const cx = classNames.bind(styles);

interface SliderContainerInterface {
    children: ReactElement[],
    className?: string,
    settings?: {
        slidesToShow: number,
        draggable: boolean,
        infinity: boolean,
        transition: number,
        dots: boolean,
        nav: boolean
    }
}
const defaultSettings = {
    slidesToShow: 1,
    infinity: false,
    draggable: true,
    transition: 0.5,
    nav: true,
    dots: true
};

export function SliderContainer(props: SliderContainerInterface): ReactElement {
    const {
        children,
        settings,
        className
    } = props;

    const {
        slidesToShow,
        draggable,
        infinity,
        transition,
        dots,
        nav
    } = { ...defaultSettings, ...settings };

    const sliderRef = useRef<HTMLDivElement>();
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const init = () => {
            const w = sliderRef.current.offsetWidth;
            Array.from(sliderRef.current.children)
                .forEach((c: HTMLElement) => {
                    const width = `${w / slidesToShow}px`;
                    // eslint-disable-next-line no-param-reassign
                    c.style.minWidth = width;
                    // eslint-disable-next-line no-param-reassign
                    c.style.maxWidth = width;
                    // eslint-disable-next-line no-param-reassign
                    c.style.width = width;
                });
        };

        init();
        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
        };
    }, []);

    const [x, setX] = useState<number>(0);

    const goTo = (index: number) => {
        const w = sliderRef.current.offsetWidth / slidesToShow;
        setX((index) * -w);
        setCurrent(index);
    };

    const getCorrectIndex = (index: number) => {
        const length: number = children.length - 1;
        if (index > length) {
            return infinity ? 0 : current;
        }
        if (x > 0) {
            return infinity ? length : 0;
        }

        return index;
    };

    useEffect(() => {
        const w = sliderRef.current.offsetWidth / slidesToShow;
        const index = Math.round(Math.abs(x / w));
        goTo(getCorrectIndex(index));
    }, [x]);

    const renderDots = () => {
        if (!dots) {
            return null;
        }

        return (
            <div style={ { display: 'flex' } }>
                { children.map((child, index) => (
                    <div
                      key={ child.key }
                      role="option"
                      tabIndex={ 0 }
                      aria-selected={ index === current }
                      onClick={ () => goTo(index) }
                      onKeyDown={ notInteractiveClick }
                    >
                        { index + 1 }
                    </div>
                )) }
            </div>
        );
    };

    const renderNav = () => {
        if (!nav) {
            return null;
        }

        return (
            <div>
                <button
                  disabled={ current === 0 }
                  onClick={ () => goTo(current - 1) }
                >
                    prev
                </button>
                <button
                  disabled={ current === children.length - 1 }
                  onClick={ () => goTo(current + 1) }
                >
                    next
                </button>
            </div>
        );
    };

    return (
        <div className={ cx(className, styles.slider) }>
            <Draggable
              axis="x"
              position={ {
                  x,
                  y: 0
              } }
              disabled={ !draggable }
              nodeRef={ sliderRef }
              onStop={ (e, { x: posX }) => setX(posX) }
            >
                <div
                  ref={ sliderRef }
                  className={ styles.list }
                  style={ { transitionDuration: `${transition}s` } }
                >
                    { children }
                </div>
            </Draggable>
            { renderNav() }
            { renderDots() }
        </div>
    );
}

SliderContainer.defaultProps = {
    settings: {},
    className: ''
};

export default SliderContainer;
