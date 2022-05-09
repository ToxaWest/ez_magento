import dynamic from 'next/dynamic';

const ConfigurableOptions = dynamic(() => import('./ConfigurableOptions.container'));

export default ConfigurableOptions;
