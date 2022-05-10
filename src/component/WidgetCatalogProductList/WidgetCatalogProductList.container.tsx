import ProductCard from '@component/ProductCard';
import { RootState } from '@store/index';
import Slider from '@ui/Slider';
import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

function WidgetCatalogProductListContainer(props: WidgetProductListInterface): ReactElement {
    const {
        page_var_name, products_per_page, show_pager, title
    } = props;

    const { items } = useSelector(
        (state: RootState) => state.cms.widget[page_var_name]
    ) as { items: ProductInterface[] };

    const products = useMemo(() => items.map(
        (product) => (
            <ProductCard
              product={ product }
              renderSort={ {
                  image: true,
                  link: true,
                  price: true
              } }
              key={ product.id }
            />
        )
    ), []);

    const renderContent = (): ReactElement | ReactElement[] => {
        if (show_pager) {
            return (
                <Slider settings={ {
                    slidesToShow: products_per_page,
                    dots: false
                } }
                >
                    { products }
                </Slider>
            );
        }

        return products;
    };

    return (
        <div>
            <span>{ title }</span>
            { renderContent() }
        </div>
    );
}

export default WidgetCatalogProductListContainer;
