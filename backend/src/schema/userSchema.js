const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    users: [User!]!
  }

  input UserInput {
    name: String!
    email: String!
    age: Int!
  }

  type Mutation {
    addUser(input: UserInput!): User!
  }
`;

module.exports = userTypeDefs;
