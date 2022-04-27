import styles from './CategoryDescription.module.scss';

import Html from '@component/Html';
import Image from '@component/Image';
import { useSelector } from 'react-redux';

function CategoryDescriptionComponent() {
    const {
        current: {
            description,
            name,
            image
        }
    } = useSelector((state) => state.category);

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
