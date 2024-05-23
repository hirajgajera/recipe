import {client} from '../common/apolloClient';
import {CREATE_USER, GET_USER} from '../common/gql';

export async function signUp(
  username: string,
  email: string,
  password: string,
) {
  return await client
    .mutate({
      mutation: CREATE_USER,
      variables: {username, email, password},
    })
    .then(response => {
      return response.data.createUser;
    })
    .catch(error => {
      return JSON.parse(JSON.stringify(error, null, 2));
    });
}

export async function login(email: string, password: string) {
  return await client
    .query({
      query: GET_USER,
      variables: {email, password},
    })
    .then(response => {
      return response.data.getUser;
    })
    .catch(error => {
      return error;
    });
}
