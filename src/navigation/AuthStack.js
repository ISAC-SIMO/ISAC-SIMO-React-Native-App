import React from 'react';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ForgetPasswordScreen from '../screens/Auth/ForgetPassword';
import CameraApp from "../screens/video/App";
//import FormVideo from '../screens/Home/FormVideo';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function AuthNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
       

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
          
    </Stack.Navigator>
  );
}

export default AuthNavigator;
