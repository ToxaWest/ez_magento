import styles from './Popup.module.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import ClickOutside from 'Component/ClickOutside';
import { freezeScroll, unfreezeScroll } from 'Component/Popup/Popup.config';
import { hidePopup } from 'Store/popup';

const cx = classNames.bind(styles);

const PopupComponent = (props) => {
    const {
        isStatic, children, isActive, outsideClick, onClose, id, classNames
    } = props;
    const [isBrowser, setIsBrowser] = useState(false);

    const { popupId } = useSelector((state) => state.popup);

    const dispatch = useDispatch();

    const active = isActive || id === popupId;
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        if (active) {
            freezeScroll();
        } else {
            unfreezeScroll();
        }
    }, [active]);

    const close = () => {
        onClose();
        if (outsideClick) {
            dispatch(hidePopup());
        }
    };

    const withOutSideClick = (child) => {
        if (outsideClick) {
            return (
                <ClickOutside
                  onClick={ () => {
                      close();
                  } }
                >
                    { child }
                </ClickOutside>
            );
        }

        return child;
    };

    const renderContent = () => (
        <div className={ cx(
            styles.wrapper,
            classNames.wrapper
        ) }
        >
            { withOutSideClick(
                <div className={ cx(
                    styles.content,
                    classNames.content
                ) }
                >
                    <button onClick={ close }>Close</button>
                    { children }
                </div>
            ) }
        </div>
    );

    if (isBrowser) {
        if (!active) {
            return null;
        }
        if (isStatic) {
            return renderContent();
        }

        return createPortal(
            renderContent(),
            document.body
        );
    }

    return null;
};

PopupComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.shape({})
    ]).isRequired,
    classNames: PropTypes.shape({
        content: PropTypes.string,
        wrapper: PropTypes.string
    }),
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isStatic: PropTypes.bool,
    onClose: PropTypes.func,
    outsideClick: PropTypes.bool
};

PopupComponent.defaultProps = {
    classNames: {
        content: '',
        wrapper: ''
    },
    isActive: false,
    isStatic: false,
    onClose: () => {},
    outsideClick: true
};

export default PopupComponent;
