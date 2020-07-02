import React from 'react';
import FormList from '../screens/forms/FormList';
import FormImage from '../screens/forms/FormImage';
import FormVideo from '../screens/forms/FormVideo';
import FormResult from '../screens/forms/FormResult';
import RecordVideo from '../screens/forms/RecordVideo';
import LoginScreen from '../screens/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';

import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/Feather';

import {TouchableOpacity} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Appbar, Avatar, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const myOptions = {
  header: ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <Appbar.Header theme={{colors: {primary: '#fff'}}}>
        {scene.route.name != 'FormList' ? (
          <Appbar.BackAction
            //  onPress={navigation.navigate('Home', { screen: 'FormList' })}
            onPress={() =>
              navigation.navigate('Home', {screen: 'FormList'})
            }
            color="#000"
          />
        ) : (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              //((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
              navigation.openDrawer();
            }}>
            <Icons name="align-right" color="#000" size={32} />
          </TouchableOpacity>
        )}
        <Appbar.Content
          title={
            title === 'Feed' ? (
              <MaterialCommunityIcons
                style={{marginRight: 10}}
                name="twitter"
                size={40}
                color="#000"
              />
            ) : (
              title
            )
          }
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
          }}
        />
      </Appbar.Header>
    );
  }
}
function HomeNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      //initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={myOptions}>
       <Stack.Screen name="LoginScreen" component={LoginScreen} options={{...myOptions,headerShown:false}}/>
      
         <Stack.Screen name="FormList" component={FormList} />
            <Stack.Screen name="FormResult" component={FormResult} />
      
   

      <Stack.Screen name="FormImage" component={FormImage} options={{...myOptions,headerRight: () => (
       <Text>dddd</Text>
          )}} />
      <Stack.Screen name="FormVideo" component={FormVideo} />
      <Stack.Screen name="RecordVideo" component={RecordVideo} mode="modal" options={{...myOptions,headerShown:false}}/>
    </Stack.Navigator>
  );
}



function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

//export default HomeNavigator;
