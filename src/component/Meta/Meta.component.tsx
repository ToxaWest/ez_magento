import { RootState } from '@store/index';
import Head from 'next/head';
import { useSelector } from 'react-redux';

function MetaComponent() {
    const {
        meta_title, meta_description, meta_keyword, title
    } = useSelector((state: RootState) => state.meta);
    const {
        title_prefix,
        title_suffix,
        title_separator,
        default_title,
        default_description,
        default_keywords
    } = useSelector((state: RootState) => state.config.config);

    const getTitle = () => {
        const t = title || default_title;
        if (title_suffix && title_prefix) {
            return `${title_prefix} ${title_separator} ${t} ${title_separator} ${title_suffix} `;
        }
        if (title_prefix) {
            return `${title_prefix} ${title_separator} ${t}`;
        }
        if (title_suffix) {
            return `${t} ${title_separator} ${title_suffix}`;
        }

        return t;
    };

    return (
        <Head>
            <title>{ getTitle() }</title>
            <meta name="title" content={ meta_title || default_title } />
            <meta name="description" content={ meta_description || default_description } />
            <meta name="keyword" content={ meta_keyword || default_keywords } />
        </Head>
    );
}

export default MetaComponent;
