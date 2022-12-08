import {gql} from '@src/utils/apolloClient';

export const mutationCreatePost = gql`
  mutation CreateFeed(
    $content: String!
    $name: String!
    $color: String!
    $imageLink: String!
  ) {
    createFeed(
      data: {
        content: $content
        name: $name
        color: $color
        imageLink: $imageLink
      }
    ) {
      data {
        id
      }
    }
  }
`;
