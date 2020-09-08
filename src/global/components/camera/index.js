import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Slider from '@react-native-community/slider';

import {RNCamera} from 'react-native-camera';
import ImageEditor from '@react-native-community/image-editor';

import Snackbar from 'react-native-snackbar';

class index extends Component {
  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    this.maskLength = (width * 90) / 100;
    this.state = {
      image: null,
      showCamera: false,
      modalVisible: false,
      effect: 'Normal',
      exposure: 0.5,
      autoFocus: 'off',
      autoFocusPoint: {
        normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 32,
          y: Dimensions.get('window').height * 0.5 - 32,
        },
      },
      focusDepth: 0,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  takePicture = async function () {
    if (this.camera) {
      Snackbar.show({
        text: 'Please wait Image is being cropped',
        duration: Snackbar.LENGTH_LONG,
      });
      this.camera
        .takePictureAsync({forceUpOrientation: true, fixOrientation: true})
        .then((data) => {
          let strData = data.uri;
          ImageEditor.cropImage(strData, {
            offset: {
              x: 800,
              y: 1450,
            },
            size: {
              width: 2800,
              height: 2500,
            },
          }).then((url) => {
            this.setState({
              image: url,
              showCamera: false,
              modalVisible: true,
            });
          });
        });
    }
  };

  onExposureChange(num) {
    this.setState({exposure: num});
  }
  onFocusDepthChange(value) {
    this.setState({focusDepth: value});
  }
  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
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
  render() {
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 150,
      left: this.state.autoFocusPoint.drawRectPosition.x - 50,
    };
    return (
      <View
        style={{
          flex: 1,
        }}
        onTouchStart={this.touchToFocus.bind(this)}>
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
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View style={styles.overlay} />
          <View style={styles.snapText}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              PLACE IMAGE INSIDE THE FRAME
            </Text>
          </View>
          <View style={[styles.contentRow, {height: this.maskLength}]}>
            <View style={styles.overlay} />

            <View
              style={[
                styles.content,
                {width: this.maskLength, height: this.maskLength},
              ]}>
              <View style={drawFocusRingPosition}>
                <View
                  style={{
                    postion: 'absolute',
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    borderWidth: 2,
                    borderColor: 'yellow',
                    opacity: 0.4,
                  }}
                />
              </View>
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
            <Text style={{fontSize: 15, color: '#FFFFFF', marginTop: 35}}>
              Sharpness :
            </Text>
            <Slider
              style={{width: 200, height: 100}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => this.onFocusDepthChange(value)}
            />
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
            <Text style={{fontSize: 15, color: '#FFFFFF', marginTop: 35}}>
              Exposure :
            </Text>
            <Slider
              style={{width: 200, height: 100}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(num) => this.onExposureChange(num)}
            />
          </View>
          <View style={styles.snapText}>
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton]}
              onPress={this.takePicture.bind(this)}>
              <Text> CLICK </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.overlay} />
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default index;
