import SliderComponent from '@ui/Slider/Slider.component';
import {
    createElement,
    ReactElement, useEffect, useRef, useState
} from 'react';

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

    const containerProps = {
        dots,
        goTo,
        nav,
        x,
        setX,
        current,
        draggable,
        className,
        sliderRef,
        transition,
        children
    };

    return createElement(SliderComponent, containerProps);
}

SliderContainer.defaultProps = {
    settings: {},
    className: ''
};

export default SliderContainer;
