/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  gql,
} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import RecipeForm from './src/screens/RecipeForm';
import {RootStackParamList} from './src/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeForm"
        component={RecipeForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!) {
      createUser(username: $username, email: $email) {
        id
        username
        email
      }
    }
  `;
  const [loggedIn, setLoggedIn] = useState(false);
  // const [createUser, {data, loading, error}] = useMutation(CREATE_USER);

  useEffect(() => {
    // AsyncStorage.setItem(
    //   'user',
    //   JSON.stringify({
    //     id: '664af203e107b7cb06047635',
    //     username: 'Hiraj',
    //     email: 'gajerahiraj@gmail.com',
    //   }),
    // );

    // AsyncStorage.getItem('user')
    //   .then(user => {
    //     if (user) {
    //       // go to main screen
    //       setLoggedIn(true);
    //     } else {
    //       // createUser({
    //       //   variables: {username: 'Hiraj', email: 'gajerahiraj@gmail.com'},
    //       // });

    //       // save to async storage and go to main screen
    //       AsyncStorage.setItem(
    //         'user',
    //         JSON.stringify({username: 'Hiraj', email: 'gajerahiraj@gmail.com'}),
    //       );

    //       setLoggedIn(true);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('error');
    //   });

    return () => {};
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyStack />
        {/* {loggedIn ? (
        ) : (
          <>
            <Text>Loading....</Text>
          </>
        )} */}
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
