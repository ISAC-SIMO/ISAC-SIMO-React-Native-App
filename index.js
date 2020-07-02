/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {  DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
console.disableYellowBox = true;
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
AppRegistry.registerComponent(appName, () => Main);
