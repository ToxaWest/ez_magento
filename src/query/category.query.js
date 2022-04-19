import { gql } from '@apollo/client';

import { category } from 'Graphql/index';

const categoryQuery = {
    category: gql`
        ${category}
    `
};

export default categoryQuery;
