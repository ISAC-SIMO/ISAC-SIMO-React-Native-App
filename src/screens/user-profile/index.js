import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectToken} from '../../redux/app/app.selectors';
import {logoutRequest, userProfileGet} from '../../redux/auth/auth.actions';
import {
  selectCurrentUser,
  selectLoading,
} from '../../redux/auth/auth.selectors';
import {Button} from '../../global/components';

class Profile extends Component {
  componentDidMount() {
    this.props.userProfileGet();
  }
  handleLogout = () => {
    this.props.logoutRequest();
  };
  render() {
    const {user, loading, token} = this.props;
    // console.log(user, 'hello');
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 25,
              color: '#4A4A4A',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            Profile
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          <View>
            {/* {token === 'null' ? (
              <View>
                <Text>You Skipped Authentication !</Text>
                <Text>Login to get Access to more features !</Text>
              </View>
            ) : ( */}
            <View>
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
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: '800',
                  alignSelf: 'center',
                }}>
                {user && user.full_name ? user.full_name : 'loading...'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                  marginBottom: 100,
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Email :</Text>
                <Text style={{fontSize: 15, left: 10}}>
                  {user && user.email ? user.email : 'loading...'}
                </Text>
              </View>
            </View>
            {/* )} */}
          </View>
        )}
        <Button
          title={token === 'null' ? 'Go Back to Login Page' : 'Logout'}
          onPress={this.handleLogout}
          style={{marginTop: 200}}
        />
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
    backgroundColor: '#fff',
  },
  heading: {
    marginTop: 20,
    marginBottom: 100,
  },
});
