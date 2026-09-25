export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    publisher: String!
    genre: String!
    price: Float!
    stock: Int!
    description: String
    owner: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    books(genre: String, search: String): [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createBook(
      title: String!
      author: String!
      publisher: String!
      genre: String!
      price: Float!
      stock: Int!
      description: String
    ): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
