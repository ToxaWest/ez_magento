import styles from '@ui/Slider/Slider.module.scss';

import { notInteractiveClick } from '@util/Events';
import classNames from 'classnames';
import { ReactElement } from 'react';
import Draggable from 'react-draggable';

const cx = classNames.bind(styles);

interface SliderComponentInterface {
    dots: boolean
    current: number
    nav: boolean
    className: string
    draggable: boolean
    sliderRef
    transition: number
    x: number
    setX: (x: number) => void
    goTo: (index: number) => void,
    children: ReactElement[]
}

function SliderComponent(props: SliderComponentInterface) {
    const {
        dots, children, current, goTo, nav, className, draggable, sliderRef, transition, setX, x
    } = props;
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

export default SliderComponent;
