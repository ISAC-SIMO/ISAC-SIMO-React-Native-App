import React, {Component} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Permissions} from 'react-native-unimodules';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {
  setFormField,
  setVideoData,
  imageFormSubmit,
} from '../../redux/form/form.actions';
import {
  selectFormData,
  selectVideo,
  selectLoading,
} from '../../redux/form/form.selectors';

import {Video} from 'expo-av';
import Form from '../../global/components/form/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';

const ActionSheetOptions = [
  'Cancel',
  <Text style={{color: '#0046BE'}}>Record a Video</Text>,
  <Text style={{color: '#0046BE'}}>Import a Video</Text>,
];

class VideoForm extends Component {
  state = {
    video: null,
    showCamera: false,
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  handleCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then((image) => {
      console.log(image);
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'mp4' ? 'video/mp4' : 'video/mp4',
      };
      this.props.setVideoData([videoData]);
    });
  };
  handleGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then((image) => {
      console.log(image);
      const splits = image.path.split('/');
      const name = splits[splits.length - 1];
      var image = {
        uri: image.path,
        name,
        type:
          name.substr(name.length - 3) === 'mp4' ? 'video/mp4' : 'video/mp4',
      };
      this.props.setVideoData([videoData]);
    });
  };

  onDeleteSelected = (index) => () => {
    const {video} = this.props;
    const delData = [...video];
    delData.splice(index, 1);
    this.props.setVideoData([...delData]);
  };

  handleSubmit = () => {
    const {video} = this.props;
    const {field} = this.props;
    if (video.length === 0) {
      alert('Please add a Video');
    } else {
      const videoObj = video
        ? video.map((each, index) => {
            return {
              [`video_${index + 1}`]: each,
            };
          })
        : [];
      let newArray = [];
      let joinedObj = {};
      for (let i = 0; i < videoObj.length; i++) {
        const newObj = {...videoObj[i]};
        newArray.push(newObj);
        joinedObj = {...joinedObj, ...newObj};
      }
      const joinDataNVideo = {...joinedObj, ...field};
      this.props.imageFormSubmit(joinDataNVideo);
    }
  };
  render() {
    const {video, loading} = this.props;
    // console.log(video, 'video uri');
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <KeyboardAvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <View
              style={{
                paddingBottom: 30,
              }}>
              <Form />
              <View
                style={{
                  width: Dimensions.get('window').width - 30,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#d3d3d3',
                  paddingBottom: 40,
                  paddingTop: 20,
                  borderRadius: 10,
                  marginTop: 10,
                  elevation: 4,
                }}>
                <TouchableOpacity
                  onPress={this.showActionSheet}
                  style={{
                    height: 100,
                    backgroundColor: '#fff',
                    borderColor: '#d3d3d3',
                    borderWidth: 1,
                    borderStyle: 'dotted',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    marginTop: 20,
                  }}>
                  <Icon name="videocam-outline" size={40} color={'#0046BE'} />
                  <Text style={{color: '#0046BE', textTransform: 'uppercase'}}>
                    Add Video
                  </Text>
                </TouchableOpacity>
                {video
                  ? video.map((each, index) => (
                      <View
                        style={{
                          marginHorizontal: 20,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: 10,
                          borderColor: '#d3d3d3',
                          borderWidth: 2,
                          // flexWrap: 'wrap',
                        }}>
                        <Video
                          source={{
                            uri: each.uri,
                          }}
                          rate={1.0}
                          volume={1.0}
                          isMuted={false}
                          resizeMode="contain"
                          shouldPlay={false}
                          isLooping={false}
                          useNativeControls={true}
                          style={{width: 300, height: 300, left: 25}}
                        />
                        <TouchableOpacity
                          onPress={this.onDeleteSelected(index)}>
                          <Icon name="md-close" size={25} />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
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
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
              <ActionSheet
                ref={(o) => (this.ActionSheet = o)}
                title={
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    Upload a Photo
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
  field: selectFormData,
  video: selectVideo,
  loading: selectLoading,
});

const mapDispatchToProps = {setFormField, setVideoData, imageFormSubmit};

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);
