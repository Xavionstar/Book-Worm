import {gql} from '@apollo/client';

export const Login_User = gql`
mutation Login_User($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        password
        email
      }
    }
  }
`;

export const Add_User = gql`
mutation Add_User($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
      user {
        username
        email
        password
      }
    }
  }
`;

export const userWithMoreBooksNow = gql`
mutation userWithMoreBooksNow($bookData: Bookinput, $token: String) {
    saveBook(bookData: $bookData, token: $token) {
        _id

            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
    }
  }
`;

export const Remove_Book = gql`
mutation Remove_Book($bookId: ID, $id: ID, $userId: ID) {
    removeBook(bookId: $bookId, _id: $id, userId: $userId) {
      _id
      savedBooks {
        bookId
      }
    }
  }
`;