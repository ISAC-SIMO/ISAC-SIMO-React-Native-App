import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectToken} from '../../redux/app/app.selectors';
import {logoutRequest, userProfileGet} from '../../redux/auth/auth.actions';
import {
  selectCurrentUser,
  selectLoading,
} from '../../redux/auth/auth.selectors';
import {Button} from '../../global/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';

class Profile extends Component {
  componentDidMount() {
    this.requestLocation();
  }
  handleLogout = () => {
    this.props.logoutRequest();
  };
  requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted');
        await this.getCurrentLocation();
      } else {
        this.props.userProfileGet({lat: null, lng: null});
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        this.props.userProfileGet({lat, lng});
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
    const {user, loading, token} = this.props;
    // console.log(user, 'hello');
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 20,
              color: '#4A4A4A',
              textTransform: 'uppercase',
              fontWeight: '900',
            }}>
            Profile{' '}
          </Text>
        </View>
        {loading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#6383a8" />
          </View>
        ) : (
          <View
            style={{
              width: Dimensions.get('window').width - 30,
              padding: 10,
              borderRadius: 5,
              borderColor: 'white',
              borderWidth: 1,
              elevation: 4,
              backgroundColor: 'white',
            }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#d3d3d3',
                alignSelf: 'center',
              }}
              source={
                user && user.image
                  ? {
                      uri: `${user.image}`,
                    }
                  : null
              }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A4A4A',
                  fontWeight: '600',
                }}>
                Name :{' '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A4A4A',
                  fontWeight: '600',
                }}>
                {user && user.full_name ? user.full_name : 'loading...'}{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 50,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A4A4A',
                  fontWeight: '600',
                }}>
                Email :{' '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A4A4A',
                  fontWeight: '600',
                  alignSelf: 'center',
                }}>
                {user && user.email ? user.email : 'loading...'}{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.handleLogout}
              style={{
                alignSelf: 'center',
                backgroundColor: '#6383a8',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white', fontWeight: '900'}}>
                {token === 'null' ? 'Go Back' : 'Logout'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{bottom: 40, position: 'absolute', flexDirection: 'row'}}>
          <Text style={{fontSize: 12, color: '#4A4A4A'}}>AppVersion : </Text>
          <Text style={{fontSize: 12, color: '#4A4A4A'}}>1.0.2 </Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  loading: selectLoading,
  token: selectToken,
});
const mapDispatchToProps = {
  logoutRequest,
  userProfileGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3FBFF',
  },
  heading: {
    marginTop: 20,
    marginBottom: 50,
  },
});
