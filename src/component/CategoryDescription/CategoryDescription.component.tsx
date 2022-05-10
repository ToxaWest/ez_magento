import styles from './CategoryDescription.module.scss';

import Html from '@component/Html';
import Image from '@component/Image';
import { RootState } from '@store/index';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function CategoryDescriptionComponent(): ReactElement {
    const {
        current: {
            description,
            image,
            name
        }
    } = useSelector((state: RootState) => state.category);

    return (
        <div className={ styles.wrapper }>
            <Image src={ image } alt={ name } className={ styles.image } />
            <h1 className={ styles.title }>{ name }</h1>
            <div className={ styles.description }>
                <Html content={ description } />
            </div>
        </div>
    );
}

export default CategoryDescriptionComponent;
