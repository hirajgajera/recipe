const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    recipies: [Recipe]
  }

  type Recipe {
    id: ID!
    title: String!
    ingredients: [String]!
    instructions: String!
    author: String!
  }

  type Query {
    getRecipe(id: ID!): Recipe
    getAllRecipies: [Recipe]
    searchRecipies(keyword: String!): [Recipe]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    createRecipe(
      title: String!
      ingredients: [String]!
      instructions: String!
      author: String!
    ): Recipe
    updateRecipe(
      id: ID!
      title: String!
      ingredients: [String]!
      instructions: String!
    ): Recipe
    deleteRecipe(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
