const {gql} = require('apollo-server-express');

const typeDefs = gql`


type User {
    _id: ID
    username: String
    email: String!
    password: String!
    savedBooks: [Book]
}
type Book {
    
    authors: String
    description: String
    bookId: String
    image: String
    
    title: String
}
input Bookinput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    
    title: String!
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: Bookinput, token: String): User
    removeBook(bookId: ID, userId: ID ): User
}
`;

module.exports = typeDefs;