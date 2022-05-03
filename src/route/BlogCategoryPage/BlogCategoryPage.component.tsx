import styles from './BlogCategoryPage.module.scss';

import Html from '@component/Html';
import PostList from '@component/PostList';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

function BlogCategoryPageComponent() {
    const { title, content, content_heading } = useSelector((state:RootState) => state.blog.currentCategory);
    return (
        <div className={ styles.wrapper }>
            <h1>{ title }</h1>
            <div className={ styles.content_heading }>
                <Html content={ content_heading } />
            </div>
            <div className={ styles.content }>
                <Html content={ content } />
            </div>
            <PostList />
        </div>
    );
}

export default BlogCategoryPageComponent;
