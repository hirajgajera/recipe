import {gql} from '@apollo/client';

export const GET_USER = gql`
  query GetUser($email: String!, $password: String!) {
    getUser(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      ingredients
      instructions
      author
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $ingredients: [String]!
    $instructions: String!
    $author: String!
  ) {
    createRecipe(
      title: $title
      ingredients: $ingredients
      instructions: $instructions
      author: $author
    ) {
      id
      title
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $id: ID!
    $title: String!
    $ingredients: [String]!
    $instructions: String!
  ) {
    updateRecipe(
      id: $id
      title: $title
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      title
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
