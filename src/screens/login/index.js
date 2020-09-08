import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {loginRequest, clearErrorField} from '../../redux/auth/auth.actions';
import {selectToken} from '../../redux/app/app.selectors';
import {setToken} from '../../redux/app/app.actions';
import {selectLoading, selectErrors} from '../../redux/auth/auth.selectors';
import {setIsAuthenticationSkip} from '../../redux/auth/auth.actions';
import Icon from 'react-native-vector-icons/Ionicons';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInput,
      this.passwordInput,
      (this.state = {
        email: '',
        password: '',
        secureTextEntry: false,
      });
    this.toggleEyes = this.toggleEyes.bind(this);
  }

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.access) {
      nextProps.navigation.navigate('HomeScreen');
    }
    return null;
    // console.log(nextProps);
  };

  handleChange = (name) => (text) => this.setState({[name]: text});

  toggleEyes() {
    this.setState({
      textentry: !this.state.textentry,
    });
  }
  handleSubmit = () => {
    Keyboard.dismiss();
    this.props.loginRequest(this.state);
  };
  skipAunthentication = () => {
    this.props.setToken();
  };
  componentDidMount() {
    this.props.clearErrorField();
  }
  render() {
    const {loading, errors} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                Welcome to ISAC-SIMO
              </Text>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 20,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                }}
                source={require('../../../assets/logo.png')}
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0046BE',
                padding: 5,
                marginHorizontal: 80,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={this.skipAunthentication}>
              <Text style={{fontSize: 15, color: '#fff'}}>
                Skip Authentication
              </Text>
            </TouchableOpacity>
            <Text style={{alignSelf: 'center'}}>OR</Text>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Sign in
            </Text>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  borderColor: '#d3d3d3',
                  marginHorizontal: 16,
                }}>
                <Text>Email*</Text>
                <TextInput
                  style={{
                    height: 45,
                    borderWidth: 1,
                    borderColor: '#000000',
                    paddingHorizontal: 16,
                    borderRadius: 5,
                  }}
                  ref={(ref) => {
                    this.emailInput = ref;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  value={this.state.email}
                  onChangeText={this.handleChange('email')}
                  placeholder={'Email'}
                  keyboardType={'default'}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {errors && errors.email !== '' ? (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Password*</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderRadius: 5,
                      borderBottomColor: '#000000',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={{
                        height: 45,
                        paddingHorizontal: 16,
                        width: Dimensions.get('window').width - 80,
                      }}
                      ref={(ref) => {
                        this.passwordInput = ref;
                      }}
                      value={this.state.password}
                      onChangeText={this.handleChange('password')}
                      placeholder={'Password'}
                      secureTextEntry={!this.state.textentry}
                      returnKeyType={'done'}
                    />
                    <TouchableOpacity
                      style={{
                        height: 45,
                        width: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 90,
                      }}
                      onPress={this.toggleEyes}>
                      {this.state.textentry ? (
                        <Icon name="ios-eye-outline" size={20} />
                      ) : (
                        <Icon name="ios-eye-off-outline" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {errors && errors.email !== '' ? (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={{
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0046BE',
                    borderWidth: 1,
                    borderColor: '#0046BE',
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                  onPress={this.handleSubmit}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#555',
                    }}>
                    Don't Have an Account?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#555',
                    }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  loading: selectLoading,
  errors: selectErrors,
});

const mapDispatchToProps = {
  loginRequest,
  clearErrorField,
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
