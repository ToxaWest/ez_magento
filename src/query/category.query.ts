import { gql } from '@apollo/client';
import { category } from '@graphql/index';

const categoryQuery = {
    category: gql`
        ${category}
    `
};

export default categoryQuery;
