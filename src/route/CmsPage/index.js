import dynamic from 'next/dynamic';

const CmsPage = dynamic(() => import('./CmsPage.component'));
export default CmsPage;
