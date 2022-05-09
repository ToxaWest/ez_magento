import styles from '@ui/Slider/Slider.module.scss';

import Icon from '@ui/Icon';
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
        if (!dots || children.length === 1) {
            return null;
        }

        return (
            <div className={ styles.dots } role="listbox" aria-label="Slider dots">
                { children.map((child, index) => (
                    <div
                      key={ child.key }
                      role="option"
                      tabIndex={ 0 }
                      aria-selected={ index === current }
                      onClick={ () => goTo(index) }
                      aria-label={ (index + 1).toString() }
                      onKeyDown={ notInteractiveClick }
                    />
                )) }
            </div>
        );
    };

    const renderNav = () => {
        if (!nav || children.length === 1) {
            return null;
        }

        return (
            <>
                <button
                  disabled={ current === 0 }
                  className={ styles.arrow_left }
                  onClick={ () => goTo(current - 1) }
                >
                    <Icon name="arrow_left" />
                </button>
                <button
                  disabled={ current === children.length - 1 }
                  onClick={ () => goTo(current + 1) }
                  className={ styles.arrow_right }
                >
                    <Icon name="arrow_right" />
                </button>
            </>
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
              disabled={ !draggable || children.length === 1 }
              defaultClassNameDragging={ styles.Dragging }
              nodeRef={ sliderRef }
              onStop={ (e, { x: posX }) => setX(posX) }
            >
                <div
                  ref={ sliderRef }
                  className={ styles.list }
                  style={ { transitionDuration: `${transition}ms` } }
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
