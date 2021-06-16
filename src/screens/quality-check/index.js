import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {
  selectCurrentUser,
  selectLoading,
} from '../../redux/auth/auth.selectors';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }
  componentDidMount() {
    //calling request location function on componentdidmount
    this.requestLocation();
  }
  onRefresh = () => {
    this.requestLocation();
  };
  requestLocation = async () => {
    //this function request permission first, if allowed, it return coords with lat and lng and returns Quality checks based on that location
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted');
        await this.getCurrentLocation();
      } else {
        this.props.userProfileGet({lat: null, lng: null}); //if location is denied by the user, it sends null lat and lng to the server which returns global quality checks
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        //retrieing coordinated
        console.log(position, 'positionn');
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        this.props.userProfileGet({lat, lng}); //passing it to the action  which returns suitable quality checks based on the lat and lng sent to the server
      },
      error => alert(JSON.stringify(error)),
      {
        accuracy: {android: 'high'},
        forceRequestLocation: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  render() {
    const {current, loading} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator color="#6383a8" size="large" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <View
              style={{
                paddingBottom: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                // flex: 1,
              }}>
              {current && current.object_types.length !== 0 ? (
                current.object_types.map((each, index) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    style={styles.smallCards}
                    onPress={() =>
                      this.props.navigation.navigate('Instruction', {each})
                    }>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Image
                        style={{
                          height: 125,
                          width: Dimensions.get('window').width / 2 - 10,
                          borderWidth: 0.5,
                          borderColor: '#FFFFFF',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                        source={{uri: each.image}}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: '#4A4a4A',
                          fontWeight: 'bold',
                          fontSize: 15,
                          paddingVertical: 10,
                        }}>
                        {each.name}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginTop: Dimensions.get('window').height / 2 - 50,
                  }}>
                  <Text
                    style={{
                      color: '#4A4a4A',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    No Data Found !!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  current: selectCurrentUser, //selectors
  loading: selectLoading,
});
const mapDispatchToProps = {userProfileGet}; //actions

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FBFF',
  },
  smallCards: {
    height: 150,
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginTop: 10,
    elevation: 4,
    overflow: 'hidden',
  },
});
