import { gql } from '@apollo/client';
import { urlResolver } from '@gql/index';

const urlQuery = {
    urlResolver: gql`
        ${urlResolver}
    `
};

export default urlQuery;
