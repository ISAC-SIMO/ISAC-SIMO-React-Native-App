//new crowd source data submit page
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
} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import ImageModal from 'react-native-image-modal';
import RNPickerSelect from 'react-native-picker-select';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {
  getObjectTypes,
  setFormField,
  setImagesData,
  crowdSourceImageFormSubmit,
  setEditBool,
  crowdSourceImageFormDataUpdate,
  clearCrowdSourceField,
} from '../../redux/form/form.actions';
import {
  selectCrowdSourceData,
  selectLoading,
  selectFormData,
  selectImages,
  selectEditBool,
} from '../../redux/form/form.selectors';
import {selectToken} from '../../redux/app/app.selectors';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {selectCurrentUser} from '../../redux/auth/auth.selectors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

const image_type = [
  {name: 'Raw', value: 'raw'},
  {name: 'Processed', value: 'processed'},
];

const ActionSheetOptions = [
  'Cancel',
  <Text style={{color: '#0046BE'}}>Click a Photo</Text>,
  <Text style={{color: '#0046BE'}}>Import from Gallery</Text>,
];

class index extends Component {
  componentDidMount() {
    this.props.getObjectTypes();
    const {userdata, token} = this.props;
    if (token == 'null') {
      this.props.setFormField({
        key: 'username',
        value: 'Guest',
      });
    } else {
      this.props.setFormField({
        key: 'username',
        value: userdata.full_name,
      });
    }
  }
  componentWillUnmount() {
    this.props.getObjectTypes();
    this.props.setEditBool(false);
    this.props.clearCrowdSourceField();
  }

  showActionSheet = () => {
    //shows action sheet
    this.ActionSheet.show();
  };
  onHandleChange = (key, value) => {
    this.props.setFormField({
      key,
      value,
    });
  };
  handleCamera = () => {
    //this function opens camera
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
      };
      const {images} = this.props;
      this.props.setImagesData([...images, image]);
    });
  };
  handleGallery = () => {
    //this function opens gallery
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
      };
      const {images} = this.props;
      this.props.setImagesData([...images, image]);
    });
  };
  onDeleteSelected = index => () => {
    //deletes selected data
    const {images} = this.props;
    const delData = [...images];
    delData.splice(index, 1);
    this.props.setImagesData([...delData]);
  };
  handleSubmit = () => {
    //submits data to the server
    const updatedata = this.props.navigation.getParam('each');
    const {edit} = this.props;
    const {images} = this.props;
    const {field} = this.props;
    if (edit) {
      const imagesObj = images
        ? images.map((each, index) => {
            return {
              [`file`]: each,
            };
          })
        : [];
      let newArray = [];
      let joinedObj = {};
      for (let i = 0; i < imagesObj.length; i++) {
        const newObj = {...imagesObj[i]};
        newArray.push(newObj);
        joinedObj = {...joinedObj, ...newObj};
      }
      const joinDataNImage = {...joinedObj, ...field};
      console.log(joinDataNImage, 'images');
      if (edit) {
        this.props.crowdSourceImageFormDataUpdate({
          id: updatedata.id,
          data: joinDataNImage,
        });
      } else {
        this.props.crowdSourceImageFormSubmit(joinDataNImage);
      }
    } else {
      if (images.length === 0) {
        alert('Please add atleast one image');
      } else {
        const imagesObj = images
          ? images.map((each, index) => {
              return {
                [`file`]: each,
              };
            })
          : [];
        let newArray = [];
        let joinedObj = {};
        for (let i = 0; i < imagesObj.length; i++) {
          const newObj = {...imagesObj[i]};
          newArray.push(newObj);
          joinedObj = {...joinedObj, ...newObj};
        }
        const joinDataNImage = {...joinedObj, ...field};
        console.log(joinDataNImage, 'images');
        if (edit) {
          this.props.crowdSourceImageFormDataUpdate({
            id: updatedata.id,
            data: joinDataNImage,
          });
        } else {
          this.props.crowdSourceImageFormSubmit(joinDataNImage);
        }
      }
    }
  };
  render() {
    const {loading, data, images, edit} = this.props;
    const updatedata = this.props.navigation.getParam('each');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon name="arrow-back" size={25} color="#4A4A4A" />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 18,
                  textTransform: 'uppercase',
                  color: '#4A4A4A',
                  alignSelf: 'center',
                  left: edit
                    ? Dimensions.get('window').width / 2 - 140
                    : Dimensions.get('window').width / 2 - 140,
                }}>
                {edit ? `Edit Contributions${' '}` : `Contribute Images`}
              </Text>
            </View>

            <Text style={{color: '#4A4A4A', fontSize: 16}}>Object Types* </Text>
            <View
              style={{
                borderRadius: 5,
                borderColor: '#C8C7CC',
                borderWidth: 1,
                backgroundColor: '#fff',
                height: 40,
                justifyContent: 'center',
                marginRight: 5,
                marginTop: 10,
              }}>
              <RNPickerSelect
                style={pickerStyle}
                placeholder={{
                  label: 'Select Object Types',
                  value: edit ? updatedata.object_type : null,
                }}
                onValueChange={value =>
                  this.onHandleChange('object_type', value)
                }
                items={
                  data && data.object_types
                    ? data.object_types.map(function type(each) {
                        return {
                          label: each.title,
                          value: each.value,
                          key: each.value,
                        };
                      })
                    : []
                }
              />
            </View>
            <Text
              style={{
                color: '#4A4A4A',
                fontSize: 16,
                marginTop: 10,
              }}>
              Image Types*{' '}
            </Text>
            <View
              style={{
                borderRadius: 5,
                borderColor: '#C8C7CC',
                borderWidth: 1,
                backgroundColor: '#fff',
                height: 40,
                justifyContent: 'center',
                marginRight: 5,
                marginTop: 10,
              }}>
              <RNPickerSelect
                style={pickerStyle}
                placeholder={{
                  label: 'Select Image Types',
                  value: edit ? updatedata.image_type : null,
                }}
                onValueChange={value =>
                  this.onHandleChange('image_type', value)
                }
                items={
                  image_type
                    ? image_type.map(function type(each) {
                        return {
                          label: each.name,
                          value: each.value,
                          key: each.value,
                        };
                      })
                    : []
                }
              />
            </View>
            <TouchableOpacity
              onPress={this.showActionSheet}
              style={{
                height: 100,
                backgroundColor: '#fff',
                borderColor: '#d3d3d3',
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 5,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                paddingHorizontal: 10,
              }}>
              <Icon name="ios-cloud-upload-outline" size={30} color="#4A4A4A" />
              <Text style={{color: '#6383a8'}}> Add Multiple Photos</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              marginTop: 10,
              flexWrap: 'wrap',
            }}>
            {images
              ? images.map((each, index) => (
                  <View
                    key={index}
                    style={{
                      marginHorizontal: 20,
                      borderColor: '#FFF',
                      borderWidth: 0.5,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <ImageModal
                        resizeMode="cover"
                        imageBackgroundColor="#000"
                        style={{
                          width: 100,
                          height: 100,
                        }}
                        source={
                          each && each
                            ? {
                                uri: `${each.uri}`,
                              }
                            : null
                        }
                      />
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          backgroundColor: '#FFF',
                          elevation: 4,
                        }}
                        onPress={this.onDeleteSelected(index)}>
                        <Icon size={20} name="close" color={'red'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              : null}
          </View>
          <TouchableOpacity
            style={{
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#6383a8',
              borderWidth: 1,
              borderColor: '#6383a8',
              borderRadius: 5,
              marginTop: 20,
              width: Dimensions.get('window').width / 2 - 20,
            }}
            onPress={() => this.handleSubmit()}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {edit ? 'Update' : 'Submit'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
              Select Photo
            </Text>
          }
          options={ActionSheetOptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={3}
          onPress={index => {
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
  token: selectToken,
});

const mapDispatchToProps = {
  getObjectTypes,
  setFormField,
  setImagesData,
  userProfileGet,
  crowdSourceImageFormSubmit,
  setEditBool,
  clearCrowdSourceField,
  crowdSourceImageFormDataUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
