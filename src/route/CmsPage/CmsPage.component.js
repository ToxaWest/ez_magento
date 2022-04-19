import { useSelector } from 'react-redux';

import Html from 'Component/Html';

const CmsPageComponent = () => {
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
};

export default CmsPageComponent;
