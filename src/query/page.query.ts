import { gql } from '@apollo/client';
import { cmsPage } from '@gql/index';

const pageQuery = {
    cmsPage: gql`
        ${cmsPage}
    `
};

export default pageQuery;
