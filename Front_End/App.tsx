/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import RecipeForm from './src/screens/RecipeForm';
import {RootStackParamList, UnAuthStackParamList} from './src/types/navigation';
import authStore from './src/store/authStore';
import Login from './src/screens/Auth/Login';
import SignUp from './src/screens/Auth/SignUp';
import {observer} from 'mobx-react-lite';

const AuthenticadStack = createStackNavigator<RootStackParamList>();
const UnAuthenticadStack = createStackNavigator<UnAuthStackParamList>();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function Dashboard() {
  return (
    <AuthenticadStack.Navigator>
      <AuthenticadStack.Screen
        name="Home"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <AuthenticadStack.Screen
        name="RecipeForm"
        component={RecipeForm}
        options={{headerShown: false}}
      />
    </AuthenticadStack.Navigator>
  );
}

function Authentication() {
  return (
    <UnAuthenticadStack.Navigator>
      <UnAuthenticadStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <UnAuthenticadStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </UnAuthenticadStack.Navigator>
  );
}

// function App(): React.JSX.Element {
const App: React.FC = observer(() => {
  useEffect(() => {
    // Check for user on initial render and after changes
    authStore.loadUserFromStorage();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {authStore.user ? <Dashboard /> : <Authentication />}
      </NavigationContainer>
    </ApolloProvider>
  );
});

export default App;
