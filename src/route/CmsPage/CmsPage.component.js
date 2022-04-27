import Html from '@component/Html';
import { useSelector } from 'react-redux';

function CmsPageComponent() {
    const { page } = useSelector((state) => state.cms);
    if (!page) {
        return null;
    }

    const { content } = page;
    return (
      <div>
          <Html content={ content } />
      </div>
    );
}

export default CmsPageComponent;
