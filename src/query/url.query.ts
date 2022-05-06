import { gql } from '@apollo/client';
import { urlResolver } from '@graphql/index';

const urlQuery = {
    urlResolver: gql`
        ${urlResolver}
    `
};

export default urlQuery;
