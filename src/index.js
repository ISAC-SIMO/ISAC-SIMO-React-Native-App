/* all routing setup go here */
//basic react navigation setup
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Feather from 'react-native-vector-icons/Feather';
import Login from './screens/login/index';
import HomeScreen from './screens/app-home/index';
import ProfileScreen from './screens/user-profile/index';
import Signup from './screens/register/index';
import Information from './screens/information/index';
import Quality from './screens/quality-check/index';
import Report from './screens/report/index';
import Instruction from './screens/instruction/index';
import Result from './screens/result/index';
import Crowdsource from './screens/crowdsource/index';
import AddCrowd from './screens/add-crowd/index';
import AddButton from './global/components/add/add';

//auth and app navigator are separated from each other inorder to switch between them
//by checking the presence of token in the app
const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
});

const Home = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
});

const Profile = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
});
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home,
    CrowdSource: {
      screen: () => null, // Empty screen
      navigationOptions: props => ({
        tabBarIcon: (
          <AddButton navigate={props.navigation.navigate} goback={'goback'} />
        ), // Plus button component
        tabBarLabel: () => null,
      }),
    },
    Profile,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Feather;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      labelStyle: {
        fontSize: 10,
        textTransform: 'uppercase',
      },
      activeTintColor: 'white',
      inactiveTintColor: '#BDBDB0',
      style: {
        backgroundColor: '#6383a8',
        elevation: 4,
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#fff',
      },
    },
  },
);
const AppNavigator = createStackNavigator({
  DashboardTabNavigator: {
    screen: DashboardTabNavigator,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  Information: {
    screen: Information,
    navigationOptions: () => {
      return {
        headerTitle: 'Information',
      };
    },
  },
  Quality: {
    screen: Quality,
    navigationOptions: () => {
      return {
        headerTitle: 'Quality Checks',
      };
    },
  },
  Report: {
    screen: Report,
    navigationOptions: () => {
      return {
        headerTitle: 'Report',
      };
    },
  },

  Instruction: {
    screen: Instruction,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  Result: {
    screen: Result,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  Crowdsource: {
    screen: Crowdsource,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  AddCrowd: {
    screen: AddCrowd,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
});

export const AppAuthContainer = createAppContainer(AuthNavigator);
export const AppMainContainer = createAppContainer(AppNavigator);

//exporting App and auth container
