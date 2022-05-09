import SliderComponent from '@ui/Slider/Slider.component';
import { NextRouter, useRouter } from 'next/router';
import {
    createElement,
    ReactElement, useEffect, useRef, useState
} from 'react';

interface SliderContainerInterface {
    children: ReactElement[],
    className?: string,
    settings?: {
        slidesToShow?: number,
        draggable?: boolean,
        infinity?: boolean,
        transition?: number,
        dots?: boolean,
        nav?: boolean
    }
}
const defaultSettings = {
    slidesToShow: 1,
    infinity: true,
    draggable: true,
    transition: 500,
    nav: true,
    dots: true
};

export function SliderContainer(props: SliderContainerInterface): ReactElement {
    const {
        children,
        className,
        settings
    } = props;

    const {
        dots,
        draggable,
        infinity,
        nav,
        slidesToShow,
        transition
    } = { ...defaultSettings, ...settings };

    const sliderRef = useRef<HTMLDivElement>();
    const router: NextRouter = useRouter();
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const init = () => {
            const w = sliderRef.current.offsetWidth;
            Array.from(sliderRef.current.children)
                .forEach((state: HTMLElement) => {
                    const width = `${w / slidesToShow}px`;
                    state.style.minWidth = width;
                    state.style.maxWidth = width;
                    state.style.width = width;
                });
        };

        init();
        router.events.on('routeChangeComplete', init);
        window.addEventListener('resize', init);
        return () => {
            router.events.off('routeChangeComplete', init);
            window.removeEventListener('resize', init);
        };
    }, []);

    const [x, setX] = useState<number>(0);

    const goTo = (index: number): void => {
        const w = sliderRef.current.offsetWidth / slidesToShow;
        setX((index) * -w);
        setCurrent(index);
    };

    const getCorrectIndex = (index: number): number => {
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
