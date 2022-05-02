import dynamic from 'next/dynamic';

const WidgetCatalogProductList = dynamic(() => import('./WidgetCatalogProductList.container'));
export default WidgetCatalogProductList;
