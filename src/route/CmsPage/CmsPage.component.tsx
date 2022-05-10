import Html from '@component/Html';
import { RootState } from '@store/index';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

function CmsPageComponent(): ReactElement | null {
    const { page } = useSelector((state: RootState) => state.cms);
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
