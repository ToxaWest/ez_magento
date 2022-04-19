import { gql } from '@apollo/client';

import { cmsPage } from 'Graphql/index';

const pageQuery = {
    cmsPage: gql`
        ${cmsPage}
    `
};

export default pageQuery;
