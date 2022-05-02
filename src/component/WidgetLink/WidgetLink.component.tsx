import Image from '@component/Image';
import Link from '@component/Link';
import { RootState } from '@store/index';
import Slider from '@ui/Slider';
import { useSelector } from 'react-redux';

function WidgetLinkComponent(props:WidgetLinkInterface) {
    const { id_paths } = props;
    const categories = useSelector((state: RootState) => state.cms.widget[id_paths]) as CategoryInterface[];
    const renderCategory = ({
        image, url, name, uid
    }: CategoryInterface) => (
        <div key={ uid }>
            <Image src={ image } alt={ name } />
            <Link href={ url } title={ name }>{ name }</Link>
        </div>
    );

    return (
        <Slider settings={ { slidesToShow: 4 } }>
            { categories.map(renderCategory) }
        </Slider>
    );
}
export default WidgetLinkComponent;
