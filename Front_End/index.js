/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

AppRegistry.registerComponent(appName, () => App);
