import { gql } from "@apollo/client";

export const Get_ME = gql`
  query {
    me {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;
