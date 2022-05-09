import styles from './Notifications.module.scss';

import { AppDispatch, RootState } from '@store/index';
import { resetNotification } from '@store/notifiactions';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function NotificationsComponent() {
    const { message, type } = useSelector((state: RootState) => state.notifications);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(resetNotification());
            }, 5000);
        }
    }, [dispatch, message]);

    if (!message) {
        return null;
    }

    return (
      <div className={ cx(
          styles.wrapper,
          {
              [styles[type]]: true
          }
      ) }
      >
        <span className={ styles.message }>
          { message }
        </span>
      </div>
    );
}

export default NotificationsComponent;
