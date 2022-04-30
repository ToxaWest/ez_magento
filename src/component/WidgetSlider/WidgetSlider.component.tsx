import Html from '@component/Html';
import Image from '@component/Image';
import useUrl from '@hook/useUrl';
import { SlideInterface, SliderInterface } from '@store/cms';
import { RootState } from '@store/index';
import Slider from '@ui/Slider';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function WidgetSliderComponent(props: WidgetSliderInterface) {
    const { slider_id } = props;
    const { getUrl } = useUrl();
    const {
        slides, show_menu,
        show_navigation,
        slide_speed,
        slides_to_display
    } = useSelector((state: RootState) => state.cms.widget[slider_id]) as SliderInterface;

    const renderSlide = ({ desktop_image: url, slide_text, slide_id }: SlideInterface): ReactElement => (
        <div key={ slide_id }>
            <Html content={ slide_text } />
            <Image src={ getUrl({ url }) } />
        </div>
    );

    return (
        <Slider settings={ {
            slidesToShow: slides_to_display || 1,
            dots: show_menu,
            nav: show_navigation,
            transition: slide_speed
        } }
        >
            { slides.map(renderSlide) }
        </Slider>
    );
}

export default WidgetSliderComponent;
