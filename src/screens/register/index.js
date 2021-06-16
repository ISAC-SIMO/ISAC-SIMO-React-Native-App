import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Image,
} from 'react-native';

import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {
  registerRequest,
  clearErrorField,
  setUserData,
} from '../../redux/auth/auth.actions';
import {selectToken} from '../../redux/app/app.selectors';
import {setToken} from '../../redux/app/app.actions';
import {
  selectLoading,
  selectRegisterSuccess,
  selectErrors,
  selectUserData,
} from '../../redux/auth/auth.selectors';

import Icon from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
const ActionSheetOptions = [
  'Cancel',
  <Text style={{color: '#0046BE'}}>Click a Photo</Text>,
  <Text style={{color: '#0046BE'}}>Import from Gallery</Text>,
];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.fullNameInput,
      this.emailInput,
      this.passwordInput,
      (this.state = {
        image: null,
        secureTextEntry: false,
      });
    this.toggleEyes = this.toggleEyes.bind(this);
  }

  handleChange = (name) => (text) => this.setState({[name]: text});

  toggleEyes() {
    this.setState({
      textentry: !this.state.textentry,
    });
  }

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.success) {
      nextProps.navigation.navigate('Login');
    }
    return null;
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  handleCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      console.log(image);
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
      };
      this.props.setUserData({
        key: 'image',
        value: image,
      });
    });
  };

  handleGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      console.log(image);
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
      };
      this.props.setUserData({
        key: 'image',
        value: image,
      });
    });
  };
  handleSubmit = () => {
    const {user} = this.props;
    Keyboard.dismiss();
    this.props.registerRequest(user);
  };
  componentDidMount() {
    this.props.clearErrorField();
  }
  componentWillUnmount() {
    this.props.clearErrorField();
  }
  skipAunthentication = () => {
    this.props.setToken();
  };
  onHandleChange = (key, value) => {
    this.props.setUserData({
      key,
      value,
    });
  };
  render() {
    const {loading, errors, user} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F3FBFF',
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
                  fontSize: 20,
                  color: '#4A4A4A',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                Create Account{' '}
              </Text>
            </View>
            <Text style={{alignSelf: 'center'}}>OR </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6383a8',
                padding: 5,
                marginHorizontal: 100,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => this.skipAunthentication()}>
              <Text style={{fontSize: 15, color: '#fff', alignSelf: 'center'}}>
                Skip Authentication{' '}
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: 40}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={this.showActionSheet}
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: '#fff',
                    borderColor: '#4A4A4A',
                    borderWidth: 1,
                    borderStyle: 'dotted',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    overflow: 'hidden',
                  }}>
                  {user.image === null ? (
                    <Icon name="md-person" size={50} color={'#D7D7D7'} />
                  ) : (
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        flex: 1,
                      }}
                      source={{uri: `${user.image.uri}`}}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: '#d3d3d3',
                  marginHorizontal: 16,
                }}>
                <Text>Name* </Text>
                <TextInput
                  style={{
                    height: 45,
                    borderWidth: 1,
                    borderColor: '#4A4A4A',
                    paddingHorizontal: 16,
                    borderRadius: 5,
                    marginBottom: 20,
                    backgroundColor: 'white',
                  }}
                  ref={(ref) => {
                    this.fullNameInput = ref;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.emailInput.focus()}
                  value={user.full_name}
                  onChangeText={(text) =>
                    this.onHandleChange('full_name', text)
                  }
                  placeholder={'Full Name'}
                  keyboardType={'default'}
                />
                <Text>Email* </Text>
                <TextInput
                  style={{
                    height: 45,
                    borderWidth: 1,
                    borderColor: '#4A4A4A',
                    marginBottom: 5,
                    paddingHorizontal: 16,
                    borderRadius: 5,
                    backgroundColor: 'white',
                  }}
                  ref={(ref) => {
                    this.emailInput = ref;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  value={user.email}
                  onChangeText={(text) => this.onHandleChange('email', text)}
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
                <Text>Password* </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomColor: '#000000',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
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
                    value={user.password}
                    onChangeText={(text) =>
                      this.onHandleChange('password', text)
                    }
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {errors && errors.password !== '' ? (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={{
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#6383a8',
                    borderWidth: 1,
                    borderColor: '#6383a8',
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                  onPress={this.handleSubmit}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
                      Sign Up{' '}
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
                <Text
                  style={{
                    fontSize: 16,
                    color: '#555',
                  }}>
                  Already Have an Account?{' '}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#555',
                    }}>
                    Login{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <ActionSheet
                ref={(o) => (this.ActionSheet = o)}
                title={
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    Select Photo
                  </Text>
                }
                options={ActionSheetOptions}
                cancelButtonIndex={0}
                destructiveButtonIndex={3}
                onPress={(index) => {
                  if (index == 1) {
                    this.handleCamera();
                  } else if (index == 2) {
                    this.handleGallery();
                  }
                }}
              />
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
  success: selectRegisterSuccess,
  errors: selectErrors,
  user: selectUserData,
});

const mapDispatchToProps = {
  registerRequest,
  clearErrorField,
  setUserData,
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
