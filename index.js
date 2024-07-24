/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { MyStack } from './screen';
import SQLite from 'react-native-sqlite-storage';
import { AppState } from 'react-native';



AppRegistry.registerComponent(appName, () => () => <MyStack />);
