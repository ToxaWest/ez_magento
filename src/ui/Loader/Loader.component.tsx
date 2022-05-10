import styles from './Loader.module.scss';

import classNames from 'classnames';
import { ReactElement } from 'react';

const cx = classNames.bind(styles);

function Loader(props: { isLoading: boolean, isMain?: boolean }): ReactElement {
    const {
        isLoading,
        isMain
    } = props;

    if (!isLoading) {
        return null;
    }

    const renderMain = (): ReactElement => (
        <div className={ styles.LoaderMain }>
            <span />
        </div>
    );

    return (
        <div className={ cx(
            styles.Loader,
            { [styles.Loader_isMain]: isMain }
        ) }
        >
            <div className={ styles.LoaderScale }>
                { renderMain() }
            </div>
        </div>
    );
}

Loader.defaultProps = {
    isMain: false
};

export default Loader;
