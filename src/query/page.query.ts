import { gql } from '@apollo/client';
import { cmsPage, scandiwebSlider } from '@graphql/index';

const pageQuery = {
    cmsPage: gql`
        ${cmsPage}
    `,
    scandiwebSlider: gql`
        ${scandiwebSlider}
    `
};

export default pageQuery;
