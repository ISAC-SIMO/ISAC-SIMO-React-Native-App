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
  StyleSheet,
  RefreshControl,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import RNPickerSelect from 'react-native-picker-select';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {
  getObjectTypes,
  setFormField,
  setImagesData,
  crowdSourceImageFormSubmit,
  deleteCrowdsourceData,
  setEditBool,
} from '../../redux/form/form.actions';
import {
  selectCrowdSourceData,
  selectLoading,
  selectFormData,
  selectImages,
  selectEditBool,
} from '../../redux/form/form.selectors';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {selectCurrentUser} from '../../redux/auth/auth.selectors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const ActionSheetOptions = [
  'Cancel',
  <Text style={{color: '#0046BE'}}>Click a Photo</Text>,
  <Text style={{color: '#0046BE'}}>Import from Gallery</Text>,
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isRefreshing: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {
    this.props.userProfileGet({lat: null, lng: null});
    this.props.getObjectTypes();
  }

  setModalVisible = (value) => {
    this.setState({modalVisible: value});
  };

  onRefresh = () => {
    this.props.userProfileGet({lat: null, lng: null});
    this.props.getObjectTypes();
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  deleteCrowdSource = async (id) => {
    this.props.deleteCrowdsourceData(id);
    await this.props.getObjectTypes();
  };
  onEditPress = (each) => {
    this.props.setEditBool(true);
    this.props.navigation.navigate('AddCrowd', {
      each,
    });
  };

  render() {
    const {loading, data, images, field, edit} = this.props;
    // console.log(data);
    return (
      <SafeAreaView style={styles.container}>
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
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#4A4A4A',
                fontWeight: '900',
                marginBottom: 20,
              }}>
              Crowdsource Image Contributions{' '}
            </Text>
          </View>
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginTop: Dimensions.get('window').height / 2 - 100,
              }}>
              <ActivityIndicator size="small" color="#6383a8" />
            </View>
          ) : (
            <>
              {data &&
              data &&
              data &&
              data.data &&
              data.data &&
              data.data.length > 0 ? (
                data.data.map((each, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      height: 80,
                      width: Dimensions.get('window').width - 20,
                      borderRadius: 5,
                      borderWidth: 0.1,
                      backgroundColor: '#FFF',
                      elevation: 4,
                      borderColor: '#FFF',
                      alignSelf: 'center',
                      marginBottom: 5,
                      margin: 5,
                    }}>
                    <View
                      style={{
                        height: 80,
                        width: 8,
                        backgroundColor: '#6383a8',
                        borderBottomLeftRadius: 5,
                        borderLeftWidth: 1,
                        borderLeftColor: '#6383a8',
                        borderTopLeftRadius: 5,
                      }}
                    />
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{left: 5, flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: 'bold',
                            }}>
                            Object type:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: '900',
                              textTransform: 'capitalize',
                            }}>
                            {' '}
                            {each.object_type}{' '}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: 'bold',
                            }}>
                            Image :{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: '900',
                              textTransform: 'capitalize',
                            }}>
                            {' '}
                            {each.image_type}{' '}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          justifyContent: 'space-between',
                        }}>
                        <View style={{left: 5, flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: 'bold',
                            }}>
                            Attribution:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#4A4A4A',
                              fontWeight: '900',
                              textTransform: 'capitalize',
                            }}>
                            {' '}
                            {each.username}{' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <TouchableOpacity
                            style={{
                              left: -50,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ImageModal
                              resizeMode="contain"
                              imageBackgroundColor="#000000"
                              style={{
                                width: 30,
                                height: 30,
                              }}
                              source={{
                                uri: each.file,
                              }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              left: -30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => this.onEditPress(each)}>
                            <Icon5 name="edit" size={20} color="#9ec54d" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              left: -10,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => this.deleteCrowdSource(each.id)}>
                            <Icon5 name="trash" size={20} color="#e36a5c" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginTop: Dimensions.get('window').height / 2 - 100,
                  }}>
                  <Text>No data found!</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: '#e36a5c',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
            }}
            onPress={() => this.props.navigation.navigate('AddCrowd')}>
            <Text style={{fontSize: 30, color: '#FFFFFF'}}>+</Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
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
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FBFF',
    alignContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
const pickerStyle = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'black',
  },
  placeholderColor: 'light-grey',
  underline: {borderTopWidth: 0},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
const mapStateToProps = createStructuredSelector({
  data: selectCrowdSourceData,
  loading: selectLoading,
  field: selectFormData,
  images: selectImages,
  userdata: selectCurrentUser,
  edit: selectEditBool,
});

const mapDispatchToProps = {
  getObjectTypes,
  setFormField,
  setImagesData,
  userProfileGet,
  crowdSourceImageFormSubmit,
  deleteCrowdsourceData,
  setEditBool,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
