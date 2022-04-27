import styles from './Slider.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { notInteractiveClick } from 'Util/Events';

const cx = classNames.bind(styles);

function SliderContainer(props) {
    const { children, settings, className } = props;
    const defaultSettings = {
        slidesToShow: 1,
        infinity: false,
        draggable: true,
        transition: 0.5,
        nav: true,
        dots: true
    };
    const {
        slidesToShow, draggable, infinity, transition, dots, nav
    } = { ...defaultSettings, ...settings };

    const sliderRef = useRef();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const init = () => {
            const w = sliderRef.current.offsetWidth;
            Array.from(sliderRef.current.children).forEach((c, i) => {
                const child = sliderRef.current.children[i];
                const width = `${w / slidesToShow }px`;
                child.style.minWidth = width;
                child.style.maxWidth = width;
                child.style.width = width;
            });
        };

        init();
        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
        };
    }, []);

    const [x, setX] = useState(0);

    const goTo = (index) => {
        const w = sliderRef.current.offsetWidth / slidesToShow;
        setX((index) * -w);
        setCurrent(index);
    };

    const getCorrectIndex = (index) => {
        const length = children.length - 1;
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
                      tabIndex="0"
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
              position={ { x, y: 0 } }
              disabled={ !draggable }
              nodeRef={ sliderRef }
              onStop={ (e, { x }) => setX(x) }
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

SliderContainer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
    settings: PropTypes.shape({
        slidesToShow: PropTypes.number,
        draggable: PropTypes.bool,
        infinity: PropTypes.bool,
        transition: PropTypes.number,
        dots: PropTypes.bool,
        nav: PropTypes.bool
    })
};

SliderContainer.defaultProps = {
    settings: {},
    className: ''
};

export default SliderContainer;
