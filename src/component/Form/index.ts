import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./Form.component'));

export default Form;
