/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {
  MyStack,
} from './screen';
AppRegistry.registerComponent(appName, () => () => <MyStack />);
