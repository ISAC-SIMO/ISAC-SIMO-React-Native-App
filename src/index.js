/* all routing setup go here */
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
import ImageForm from './screens/image-form/index';
import VideoForm from './screens/video-form/index';
import Instruction from './screens/instruction/index';
import Result from './screens/result/index';

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
        // fontFamily: 'sfprotextSemibold',
      },
      activeTintColor: 'white',
      inactiveTintColor: '#8D95DC',
      style: {
        backgroundColor: '#0046BE',
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
  ImageForm: {
    screen: ImageForm,
    navigationOptions: () => {
      return {
        headerTitle: 'Image',
      };
    },
  },
  VideoForm: {
    screen: VideoForm,
    navigationOptions: () => {
      return {
        headerTitle: 'Video',
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
});

// const AuthSkipNavigator = createSwitchNavigator({
//   SkippedAuthHome: {
//     screen: SkippedAuthHome,
//     navigationOptions: () => {
//       return {
//         headerShown: false,
//       };
//     },
//   },
//   AuthSkipInfo: {
//     screen: AuthSkipInfo,
//     navigationOptions: () => {
//       return {
//         headerTitle: 'Information',
//       };
//     },
//   },
//   AuthSkipQuality: {
//     screen: AuthSkipQuality,
//     navigationOptions: () => {
//       return {
//         headerTitle: 'Quality Check',
//       };
//     },
//   },
//   AuthSkipImageForm: {
//     screen: AuthSkipQuality,
//     navigationOptions: () => {
//       return {
//         headerTitle: 'Image',
//       };
//     },
//   },
//   AuthSkipVideoForm: {
//     screen: AuthSkipVideoForm,
//     navigationOptions: () => {
//       return {
//         headerTitle: 'Video',
//       };
//     },
//   },
// });

// export const SkippedAuthContainer = createAppContainer(AuthSkipNavigator);
export const AppAuthContainer = createAppContainer(AuthNavigator);
export const AppMainContainer = createAppContainer(AppNavigator);
