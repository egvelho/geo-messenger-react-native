import {gql} from '@src/utils/apolloClient';

export const queryGetFeedPage = gql`
  query GetFeedPage($page: Int!, $pageSize: Int!) {
    feeds(
      sort: ["createdAt:desc"]
      pagination: {pageSize: $pageSize, page: $page}
    ) {
      data {
        attributes {
          name
          color
          content
          imageLink
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
