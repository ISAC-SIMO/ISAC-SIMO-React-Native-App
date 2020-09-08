import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Modal,
  Alert,
} from 'react-native';

import {Surface} from 'gl-react-native';
import ImageFilters from 'react-native-gl-image-filters';

import {
  settings,
  whiteBalance,
  prevSetting,
  settingsToApply,
} from '../../global/components/image-filter/utils/settings';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';
import AF from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import RNFS from 'react-native-fs';

import Slider from '@react-native-community/slider';

import {RNCamera} from 'react-native-camera';

import ImagePicker from 'react-native-image-crop-picker';

import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {selectCurrentUser} from '../../redux/auth/auth.selectors';
import {imageFormSubmit} from '../../redux/form/form.actions';
import {selectLoading} from '../../redux/form/form.selectors';

import {selectToken} from '../../redux/app/app.selectors';

import Snackbar from 'react-native-snackbar';

import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';

const ActionSheetOptions = [
  'Cancel',
  <Text style={{color: '#0046BE'}}>Click a Photo</Text>,
  <Text style={{color: '#0046BE'}}>Import from Gallery</Text>,
];
const width = Dimensions.get('window').width - 40;
class index extends Component {
  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    this.maskLength = (width * 90) / 100;
    this.state = {
      ...settings,
      hue: 0,
      blur: 0,
      sepia: 0,
      sharpen: 0,
      negative: 0,
      contrast: 1,
      saturation: 1,
      brightness: 1,
      temperature: 6500,
      exposure: 0,
      selected: [],
      image: null,
      showCamera: false,
      modalVisible: false,
      type: null,
      isConnected: null,
      effect: 'Normal',
      exposure: 0.5,
      wb: RNCamera.Constants.WhiteBalance.auto,
      wbNum: 0,
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 32,
          y: Dimensions.get('window').height * 0.5 - 32,
        },
      },
      imgHeight: null,
      imgWidth: null,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.setState({type: state.type, isConnected: state.isConnected});
    });
    const data = this.props.navigation.getParam('each');
    if (data.id === 3 || data.id === 4 || data.id === 5) {
      Alert.alert(
        'Alert',
        'This Page is Under Construction',
        [
          {
            text: 'Go Back',
            onPress: () => this.props.navigation.navigate('Quality'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
    return null;
  }

  setModalVisible = (value) => {
    this.setState({modalVisible: value});
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  handleGallery = async () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      this.setState({
        image: image.path,
        imgHeight: image.height,
        imgWidth: image.width,
        modalVisible: true,
      });
    });
  };
  takePicture = async function () {
    const {token, current} = this.props;
    if (this.camera) {
      Snackbar.show({
        text: 'Please wait Image is being cropped',
        duration: Snackbar.LENGTH_LONG,
      });

      this.camera
        .takePictureAsync({
          forceUpOrientation: true,
          fixOrientation: true,
          quality: 1,
        })
        .then((data) => {
          let strData = data;
          this.setState({showCamera: false});
          ImagePicker.openCropper({
            path: strData.uri,
            cropping: true,
            freeStyleCropEnabled: true,
          }).then((image) => {
            this.setState({
              image: image.path,
              imgHeight: image.height,
              imgWidth: image.width,
              modalVisible: true,
            });
          });
        });
    }
  };

  onExposureChange(num) {
    this.setState({exposure: num});
  }
  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  toggleWhiteBalance() {
    const {wb, wbNum} = this.state;
    if (wbNum > 5) {
      this.setState({wb: RNCamera.Constants.WhiteBalance.auto, wbNum: 0});
    } else {
      this.setState({wbNum: wbNum + 1, wb: whiteBalance[wbNum + 1]});
    }
  }
  touchToFocus(event) {
    const {autoFocus} = this.state;
    if (autoFocus === 'on') {
      console.log('Autofocus is On!');
    } else {
      const {pageX, pageY} = event.nativeEvent;
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;
      const isPortrait = screenHeight > screenWidth;

      let x = pageX / screenWidth;
      let y = pageY / screenHeight;
      // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
      if (isPortrait) {
        x = pageY / screenHeight;
        y = -(pageX / screenWidth) + 1;
      }

      this.setState({
        autoFocusPoint: {
          normalized: {x, y},
          drawRectPosition: {x: pageX, y: pageY},
        },
      });
    }
  }
  deleteImageFile(filename) {
    RNFS.exists(filename)
      .then((result) => {
        console.log('file exists: ', result);

        if (result) {
          return (
            RNFS.unlink(filename)
              .then(() => {
                console.log('FILE DELETED');
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message, 'error message');
              })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  selectedFilter(filter) {
    const prevSelected = this.state.selected;
    if (this.state.selected.includes(filter.name)) {
      this.setState({
        [filter.name]: prevSetting[filter.name],
        selected: prevSelected.filter((each) => each !== filter.name),
      });
    } else {
      this.setState({
        [filter.name]: settingsToApply[filter.name],
        selected: [...prevSelected, filter.name],
      });
    }
  }
  handleSubmit = async () => {
    const {isConnected} = this.state;
    if (isConnected === true) {
      const result = await this.image.glView.capture();
      const splt = result.uri.split('/');
      const fname = splt[splt.length - 1];
      const dirPictures = `${RNFS.CachesDirectoryPath}/GLView/${fname}`;
      this.setState({image: result.uri});
      this.deleteImageFile(dirPictures);
      const data = this.props.navigation.getParam('each');
      const {image} = this.state;
      const splits = image.split('/');
      const name = splits[splits.length - 1].replace(/-/g, '');
      var imageData = {
        uri: image,
        name,
        type:
          name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
      };
      let main_data = {};
      main_data = {imageData, object_type_id: data.id};
      this.props.imageFormSubmit(main_data);
    } else {
      Alert.alert(
        'Alert',
        'No Internet Connection! Please turn on your mobile data or your Wifi !',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Pressed Cancel'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }

    this.setModalVisible(false);
    this.props.navigation.navigate('Result');
  };
  // getPrediction = async () => {
  //   console.log(url, "url hy ta yo chai");
  //   await tf.ready();
  //   const model = await mobilenet.load();
  //   const fileUri = url;
  //   const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });
  //   const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
  //   const newData = new Uint8Array(imgBuffer);
  //   const imageTensor = decodeJpeg(newData); // transforms byte array into 3d tensor
  //   const prediction = await model.classify(imageTensor);
  //   setDisplayText(JSON.stringify(prediction));
  // };
  render() {
    const {showCamera, selected, wbNum} = this.state;
    const {loading} = this.props;
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 150,
      left: this.state.autoFocusPoint.drawRectPosition.x - 50,
    };
    const data = this.props.navigation.getParam('each');
    return (
      <View style={styles.container}>
        {!showCamera ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {data.instruction}
                {/* Wall Check Instruction */}
              </Text>
            </View>
            <View
              style={{
                marginTop: 50,
                alignItems: 'center',
              }}>
              <Text style={styles.bodyText}>
                {' '}
                The picture should look like this:
              </Text>
            </View>
            <View
              style={{
                height: 200,
                width: 200,
                aspectRatio: data.aspectRatio,
                alignSelf: 'center',
                marginTop: 20,
                borderColor: '#DEDEDE',
                borderWidth: 2,
                overflow: 'hidden',
                borderRadius: 5,
              }}>
              <Image
                style={{
                  height: undefined,
                  width: undefined,
                  resizeMode: 'stretch',
                  flex: 1,
                }}
                source={data.image}
              />
            </View>
            <View
              style={{
                marginTop: 50,
                alignItems: 'center',
              }}>
              <Text style={styles.bodyText}> You Should Take the Picture:</Text>
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text style={styles.bodyText}>- cropped</Text>
              <Text style={styles.bodyText}>- close-up</Text>
              <Text style={styles.bodyText}>- etc</Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => this.props.navigation.navigate('Quality')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="chevron-left" color={'#F2F3F4'} size={40} />
                  <Text style={styles.footerText}>Go Back</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={this.showActionSheet}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.footerText}>Let's Go</Text>
                  <Icon name="chevrons-right" color={'#F2F3F4'} size={40} />
                </View>
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
                  this.setState({showCamera: true});
                } else if (index == 2) {
                  this.handleGallery();
                }
              }}
            />
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.header}>
                      <Text style={styles.headerText}>Captured Image</Text>
                    </View>

                    <Surface
                      style={{
                        width: Dimensions.get('window').width - 20,
                        height: Dimensions.get('window').width + 40,
                      }}
                      ref={(ref) => (this.image = ref)}>
                      <ImageFilters
                        {...this.state}
                        width={this.state.imgWidth}
                        height={this.state.imgHeight}>
                        {{uri: `${this.state.image}`}}
                      </ImageFilters>
                    </Surface>
                    <View style={{flex: 1}}>
                      <ScrollView horizontal>
                        {settings.map((each, index) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 5,
                              marginTop: 20,
                            }}>
                            <TouchableHighlight
                              key={index}
                              onPress={() => this.selectedFilter(each)}
                              style={{
                                height: 100,
                                width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: selected.includes(each.name)
                                  ? '#F194FF'
                                  : '#fff',
                                borderRadius: 4,
                                borderWidth: 1,
                              }}>
                              <Text style={styles.textFilter}>{each.name}</Text>
                            </TouchableHighlight>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#2196F3',
                        bottom: 30,
                        padding: 10,
                      }}
                      onPress={() => {
                        this.handleSubmit();
                      }}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              autoFocus={this.state.autoFocus}
              autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
              exposure={this.state.exposure}
              whiteBalance={this.state.wb}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}>
              <View style={styles.overlay} />
              <View style={styles.snapText}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  PLACE IMAGE INSIDE THE FRAME
                </Text>
              </View>
              <View
                onTouchStart={this.touchToFocus.bind(this)}
                style={[styles.contentRow, {height: this.maskLength}]}>
                <View style={styles.overlay} />

                <View
                  style={[
                    styles.content,
                    {width: this.maskLength, height: this.maskLength},
                  ]}>
                  {this.state.autoFocus === 'off' ? (
                    <View style={drawFocusRingPosition}>
                      <View
                        style={{
                          postion: 'absolute',
                          height: 64,
                          width: 64,
                          borderRadius: 32,
                          borderWidth: 2,
                          borderColor: 'yellow',
                          opacity: 0.8,
                        }}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={styles.overlay} />
              </View>
              <View
                style={[
                  styles.overlay,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    height: 100,
                  },
                ]}>
                <Text style={{fontSize: 15, color: '#FFFFFF', marginTop: 10}}>
                  Exposure :
                </Text>
                <Slider
                  style={{width: 200, height: 50}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(num) => this.onExposureChange(num)}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={this.toggleWhiteBalance.bind(this)}
                  style={{
                    left: 20,
                    height: 30,
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <AF name="white-balance-auto" size={30} color="yellow" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.toggleFocus.bind(this)}
                  style={{
                    right: 20,
                    height: 30,
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <AF
                    name="focus-auto"
                    size={30}
                    color={this.state.autoFocus === 'on' ? 'yellow' : '#ffffff'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={[styles.flipButton, styles.picButton]}
                  onPress={this.takePicture.bind(this)}>
                  <Text> CLICK </Text>
                </TouchableOpacity>
              </View>

              {/* </View> */}
              <View style={styles.overlay} />
            </RNCamera>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2F3F4',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#F2F3F4',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    flex: 1,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2F3F4',
  },
  flipButton: {
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  picButton: {
    backgroundColor: 'darkseagreen',
  },

  row: {
    flexDirection: 'row',
  },

  preview: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentRow: {
    flexDirection: 'row',
  },
  content: {
    borderWidth: 3,
    borderColor: '#00FF00',
  },
  snapText: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#171f24',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textFilter: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imagePreview: {
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  token: selectToken,
  current: selectCurrentUser,
});

const mapDispatchToProps = {imageFormSubmit};

export default connect(mapStateToProps, mapDispatchToProps)(index);
