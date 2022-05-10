import styles from './Table.module.scss';

import classNames from 'classnames';
import { ReactElement } from 'react';

const cx = classNames.bind(styles);
interface TableInterface {
    data: {
        [key: string | null]: string | number
    }[],
    head: {
        key: string,
        label: string
    }[],
    isVertical?: boolean
}

function Table(props: TableInterface): ReactElement {
    const { data, head, isVertical } = props;

    const renderHeadItem = ({ key, label }): ReactElement => <td key={ key }>{ label }</td>;

    const renderThead = (): ReactElement | null => {
        if (isVertical) {
            return null;
        }

        return (
            <thead>
                <tr>
                    { head.map(renderHeadItem) }
                </tr>
            </thead>
        );
    };

    const renderTbody = (): ReactElement[] => {
        if (isVertical) {
            return head.map(({ key, label }) => (
                <tr key={ key }>
                    <td>{ label }</td>
                    { data.map((d) => <td key={ key }>{ d[key] || '-' }</td>) }
                </tr>
            ));
        }

        const renderItem = (item: object, index): ReactElement => (
            <tr key={ index }>
                { head.map((i) => <td key={ i.key }>{ item[i.key] }</td>) }
            </tr>
        );

        return (
            data.map(renderItem)
        );
    };

    return (
        <table className={ cx(styles.table, {
            [styles.isVertical]: isVertical
        }) }
        >
            { renderThead() }
            <tbody>
                { renderTbody() }
            </tbody>
        </table>
    );
}

Table.defaultProps = {
    isVertical: false
};

export default Table;
