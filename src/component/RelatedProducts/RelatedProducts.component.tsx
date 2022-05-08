import ProductCard from '@component/ProductCard';
import { RootState } from '@store/index';
import Slider from '@ui/Slider';
import { useSelector } from 'react-redux';

function RelatedProductsComponent() {
    const { singleProduct: { related_products } } = useSelector((state: RootState) => state.products);

    if (!related_products.length) {
        return null;
    }

    return (
        <div>
            <span>related products</span>
            <Slider
              settings={ {
                  slidesToShow: 4,
                  dots: false
              } }
            >
                { related_products.map((product) => (
                    <ProductCard
                      key={ product.id }
                      product={ product }
                      renderSort={ {
                          image: true,
                          link: true
                      } }
                    />
                )) }
            </Slider>
        </div>

    );
}

export default RelatedProductsComponent;
