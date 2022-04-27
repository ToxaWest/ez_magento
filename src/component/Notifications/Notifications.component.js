import styles from './Notifications.module.scss';

import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetNotification } from 'Store/notifiactions';

const cx = classNames.bind(styles);
function NotificationsComponent() {
    const { type, message } = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

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
