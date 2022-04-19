import { gql } from '@apollo/client';

import { urlResolver } from 'Graphql/index';

const urlQuery = {
    urlResolver: gql`
        ${urlResolver}
    `
};

export default urlQuery;
