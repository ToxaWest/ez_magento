import styles from './Popup.module.scss';

import ClickOutside from '@component/ClickOutside';
import { freezeScroll, unfreezeScroll } from '@component/Popup/Popup.config';
import { AppDispatch, RootState } from '@store/index';
import { hidePopup } from '@store/popup';
import classNames from 'classnames';
import {
    ReactElement, useEffect, useState
} from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

interface PopupComponentInterface {
    children: ReactElement | ReactElement[] | Element[] | Element,
    classNames?: {
        content: string,
        wrapper: string
    },
    id: string,
    isActive?: boolean,
    isStatic?: boolean,
    onClose?: () => void,
    outsideClick?: boolean
}

function PopupComponent(props: PopupComponentInterface) {
    const {
        children, classNames: classNamesObj, id, isActive, isStatic, onClose, outsideClick
    } = props;
    const [isBrowser, setIsBrowser] = useState<boolean>(false);

    const { popupId } = useSelector((state: RootState) => state.popup);

    const dispatch = useDispatch<AppDispatch>();

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

    const withOutSideClick = (child: ReactElement): ReactElement => {
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

    const renderChildren = () => children as ReactElement;

    const renderContent = () => (
        <div className={ cx(
            styles.wrapper,
            classNamesObj.wrapper,
        ) }
        >
            { withOutSideClick(
                <div className={ cx(
                    styles.content,
                    classNamesObj.content,
                ) }
                >
                    <button onClick={ close }>Close</button>
                    { renderChildren() }
                </div>
            ) }
        </div>
    );

    if (isBrowser) {
        if (!active) {
            return null;
        }
        if (isStatic) {
            return renderContent() as ReactElement;
        }

        return createPortal(
            renderContent(),
            document.body,
        ) as ReactElement;
    }

    return null;
}

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
