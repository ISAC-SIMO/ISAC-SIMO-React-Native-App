import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/navigation/AuthStack';
import HomeStack from './src/navigation/HomeStack'

function App() {
  return (
    <NavigationContainer>
<HomeStack/>
    </NavigationContainer>
  );
}

export default App;