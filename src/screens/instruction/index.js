import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
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
import ImageEditor from '@react-native-community/image-editor';

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
      ratio: '1:1',
      scrollOffset: null,
      maxScrollOffset: null,
      yOff: null,
      bH: null,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.scrollViewRef = React.createRef();
  }

  componentDidMount() {
    //Checking whether the device is connected to internet or not
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.setState({type: state.type, isConnected: state.isConnected});
    });
  }

  setModalVisible = value => {
    //function to turn on and off for the visibility of  modal
    this.setState({modalVisible: value});
  };

  showActionSheet = () => {
    //function which shows as actionsheet
    this.ActionSheet.show();
  };

  handleGallery = async () => {
    //this function is used to pick images from the devices gallery
    //it uses ImagePicker library which basically opens the gallery with openPicker function to pick the images
    ImagePicker.openPicker({
      multiple: true, //  set multiple equals true to pick multiple images from gallery which ofcourse returns images in array
    }).then(images => {
      //now converting images params to name, uri and its type to post it into server for later
      const imagesObj = images
        ? images.map((each, index) => {
            const splits = each.path.split('/');
            const name = splits[splits.length - 1];
            var image = {
              uri: each.path,
              name,
              type:
                name.substr(name.length - 3) === 'png'
                  ? 'image/png'
                  : 'image/jpeg',
            };
            return image;
          })
        : [];

      //setting the data in the state
      this.setState({
        image: imagesObj,
        modalVisible: true,
      });
    });
  };
  takePicture = async function () {
    //this function helps in capturing picture for RNCamera library
    const {token, current} = this.props;
    const {yOff, bH} = this.state;
    if (this.camera) {
      Snackbar.show({
        text: 'Please wait Image is being cropped',
        duration: Snackbar.LENGTH_LONG,
      });

      this.camera //camera reference
        .takePictureAsync({
          //function which takes pictures with given params in it
          forceUpOrientation: true,
          fixOrientation: true,
          quality: 1,
        })
        .then(data => {
          //returns images as data
          let strData = data;
          this.setState({showCamera: false});
          let cropData = {
            //config for image editor library to crop image within the border of the RNCamera
            offset: {x: yOff * 5, y: yOff * 5},
            size: {width: bH * 5, height: bH * 5},
            displaySize: {width: bH * 5, height: bH * 5},
            resizeMode: 'contain',
          };
          //some optimization is left to be done as it is somewhat off from the image within the border
          ImageEditor.cropImage(strData.uri, cropData).then(url => {
            this.setState({
              image: url,

              modalVisible: true,
            });
          });
        });
    }
  };

  onExposureChange(num) {
    //function to change exposure in RNCamera
    this.setState({exposure: num});
  }
  toggleFocus() {
    //function to toggle focus for auto or manual focus in camera
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  toggleWhiteBalance() {
    //function to toggle whitebalance in camera
    const {wb, wbNum} = this.state;
    if (wbNum > 5) {
      this.setState({wb: RNCamera.Constants.WhiteBalance.auto, wbNum: 0});
    } else {
      this.setState({wbNum: wbNum + 1, wb: whiteBalance[wbNum + 1]});
    }
  }
  touchToFocus(event) {
    //function to focus object with the border frame
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

  handleSubmit = async () => {
    //function which subits the data into the server
    const {isConnected, image} = this.state;
    if (isConnected === true) {
      if (Array.isArray(image)) {
        //chekcing whether it is an array or not as picture when captured from camera returns an object while gallery returns an array
        const data = this.props.navigation.getParam('each');
        const {image} = this.state;
        const imagesObj = image
          ? image.map((each, index) => {
              return {
                [`image_${index + 1}`]: each,
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
        const joinDataNImage = {...joinedObj, object_type_id: data.id};
        console.log(joinDataNImage, 'dataa'); //if its an array you can see the output here thats to be sent to the server
        this.props.imageFormSubmit(joinDataNImage);
        this.props.navigation.navigate('Result', {object_id: data.id});
        this.setModalVisible(false);
      } else {
        //else statement performs task for an object returned from camera
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
        console.log(main_data, 'dataa'); //you can console to see the data here
        this.props.imageFormSubmit(main_data);
        this.props.navigation.navigate('Result', {object_id: data.id});
        this.setModalVisible(false);
      }
    } else {
      Alert.alert(
        'Alert',
        'No Internet Connection..Please turn on your mobile data or your Wifi!',
        [
          {
            text: 'Ok',
            onPress: () => this.setModalVisible(false),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  render() {
    const {showCamera, selected, imgWidth, imgHeight, image} = this.state;
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
              <Text style={styles.headerText}>{data.name} Instructions </Text>
            </View>
            <ScrollView>
              <View style={{paddingBottom: 20}}>
                <View
                  style={{
                    marginTop: Dimensions.get('window').height <= 640 ? 20 : 50,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.bodyText}>
                    {' '}
                    The picture should look like this:{' '}
                  </Text>
                </View>
                <View
                  style={{
                    height: 200,
                    width: 200,
                    alignSelf: 'center',
                    marginTop: 10,
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
                    source={{uri: data.image}}
                  />
                </View>
                <View
                  style={{
                    marginTop: Dimensions.get('window').height <= 640 ? 20 : 50,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.bodyText}> {data.instruction} </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={() => this.props.navigation.navigate('Quality')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="chevron-left" color={'#F2F3F4'} size={40} />
                  <Text style={styles.footerText}>Go Back </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{justifyContent: 'center', flex: 1}}
                onPress={this.showActionSheet}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.footerText}>Let's Go </Text>
                  <Icon name="chevrons-right" color={'#F2F3F4'} size={40} />
                </View>
              </TouchableOpacity>
            </View>
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
                  this.setState({showCamera: true});
                } else if (index == 2) {
                  this.handleGallery();
                }
              }}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => this.setModalVisible(false)}
              scrollOffset={this.state.scrollOffset}
              scrollOffsetMax={400 - 300}
              style={{
                margin: 0,
                backgroundColor: '#171f24',
              }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Captured Image </Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                ref={this.scrollViewRef}
                onScroll={this.handleOnScroll}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <ScrollView horizontal>
                      {Array.isArray(image) ? (
                        image.map((e, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: 'row',
                              overflow: 'hidden',
                              borderRadius: 5,
                              height: Dimensions.get('window').height / 2 - 10,
                              width: Dimensions.get('window').width - 20,
                            }}>
                            <Image
                              style={{
                                height:
                                  Dimensions.get('window').height / 2 - 10,
                                width: Dimensions.get('window').width - 30,
                                flex: 1,
                              }}
                              resizeMode={'contain'}
                              source={{uri: `${e.uri}`}}
                            />
                          </View>
                        ))
                      ) : (
                        <View
                          style={{
                            alignSelf: 'center',
                            overflow: 'hidden',
                            borderRadius: 5,
                            height: Dimensions.get('window').width - 10,
                            width: Dimensions.get('window').width - 20,
                          }}>
                          <Image
                            style={{
                              height: undefined,
                              width: undefined,

                              flex: 1,
                            }}
                            resizeMode={'cover'}
                            source={{uri: `${this.state.image}`}}
                          />
                        </View>
                      )}
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
              <TouchableHighlight
                style={{
                  borderRadius: 10,
                  elevation: 4,
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 10,
                  backgroundColor: '#2196F3',
                  padding: 10,
                }}
                onPress={() => {
                  this.handleSubmit();
                }}>
                <Text style={styles.textStyle}>Submit </Text>
              </TouchableHighlight>
            </Modal>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <RNCamera
              ref={ref => {
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
                  PLACE IMAGE INSIDE THE FRAME{' '}
                </Text>
              </View>
              <View
                onTouchStart={this.touchToFocus.bind(this)}
                style={[styles.contentRow, {height: this.maskLength}]}
                onLayout={event => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  console.log(x, y, width, height, 'consoleeeeeeeeeeee');
                  this.setState({yOff: y, bH: height});
                }}>
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
                  Exposure :{' '}
                </Text>
                <Slider
                  style={{width: 200, height: 50}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={num => this.onExposureChange(num)}
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
                  <AF name="white-balance-auto" size={30} color="white" />
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
                    color={this.state.autoFocus === 'on' ? 'white' : 'yellow'}
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
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    borderWidth: 1,
                    borderColor: '#D1D1D1',
                    backgroundColor: 'white',
                  }}
                  onPress={this.takePicture.bind(this)}></TouchableOpacity>
              </View>
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
    fontWeight: '900',
    color: '#F2F3F4',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#F2F3F4',
    flexWrap: 'wrap',
    marginHorizontal: 50,
  },
  footer: {
    width: '100%',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
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
    borderColor: '#FFFFFF',
  },
  snapText: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#171f24',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
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
  loading: selectLoading, //selectors from redux
  token: selectToken,
  current: selectCurrentUser,
});

const mapDispatchToProps = {imageFormSubmit}; //actions from redux

export default connect(mapStateToProps, mapDispatchToProps)(index);
