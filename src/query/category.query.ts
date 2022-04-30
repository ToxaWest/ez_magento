import { gql } from '@apollo/client';
import { category } from '@gql/index';

const categoryQuery = {
    category: gql`
        ${category}
    `
};

export default categoryQuery;
