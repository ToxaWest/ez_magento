import styles from './CategoryDescription.module.scss';

import { useSelector } from 'react-redux';

import Html from 'Component/Html';
import Image from 'Component/Image';

const CategoryDescriptionComponent = () => {
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
};

export default CategoryDescriptionComponent;
