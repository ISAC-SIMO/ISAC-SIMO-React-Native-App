// import React, {Component} from 'react';
// import {
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   View,
//   Text,
//   Dimensions,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import {Permissions} from 'react-native-unimodules';
// import {createStructuredSelector} from 'reselect';
// import {connect} from 'react-redux';
// import {
//   setFormField,
//   setImagesData,
//   imageFormSubmit,
// } from '../../redux/form/form.actions';
// import {
//   selectFormData,
//   selectImages,
//   selectLoading,
//   selectImageResponse,
// } from '../../redux/form/form.selectors';

// import ImageFilter from '../../global/components/image-filter';
// import Form from '../../global/components/form/index';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';

// const ActionSheetOptions = [
//   'Cancel',
//   <Text style={{color: '#0046BE'}}>Click a Photo</Text>,
//   <Text style={{color: '#0046BE'}}>Import from Gallery</Text>,
// ];

// export class ImageForm extends Component {
//   state = {
//     image: null,
//     modalVisible: false,
//     id: 0,
//   };
//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//   };

//   showActionSheet = () => {
//     this.ActionSheet.show();
//   };
//   // static getDerivedStateFromProps = (nextProps) => {
//   //   const response = nextProps.response.image_files.map((each) => {
//   //     return each.result;
//   //   });
//   //   // if (response === 'go') {
//   //   //   alert('Go');
//   //   // }
//   //   return null;
//   // };
//   handleCamera = () => {
//     ImagePicker.openCamera({
//       cropping: true,
//       freeStyleCropEnabled: true,
//     }).then((image) => {
//       console.log(image);
//       const splits = image.path.split('/');
//       const name = splits[splits.length - 1];
//       var image = {
//         uri: image.path,
//         name,
//         type:
//           name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
//       };
//       const {images} = this.props;
//       this.props.setImagesData([...images, image]);
//     });
//   };
//   handleGallery = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       freeStyleCropEnabled: true,
//     }).then((image) => {
//       console.log(image);
//   const splits = image.path.split('/');
//   const name = splits[splits.length - 1];
//   var image = {
//     uri: image.path,
//     name,
//     type:
//       name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
//   };
//   const {images} = this.props;
//       this.props.setImagesData([...images, image]);
//     });
//   };

//   onDeleteSelected = (index) => () => {
//     const {images} = this.props;
//     const delData = [...images];
//     delData.splice(index, 1);
//     this.props.setImagesData([...delData]);
//   };

//   handleSubmit = () => {
//     const {images} = this.props;
//     const {field} = this.props;
//     if (images.length === 0) {
//       alert('Please add atleast one image');
//     } else {
//   const imagesObj = images
//     ? images.map((each, index) => {
//         return {
//           [`image_${index + 1}`]: each,
//         };
//       })
//     : [];
//   let newArray = [];
//   let joinedObj = {};
//   for (let i = 0; i < imagesObj.length; i++) {
//     const newObj = {...imagesObj[i]};
//     newArray.push(newObj);
//     joinedObj = {...joinedObj, ...newObj};
//   }
//   const joinDataNImage = {...joinedObj, ...field};
//       this.props.imageFormSubmit(joinDataNImage);
//     }
//   };
//   passDataToModal = (item) => {
//     this.setState({id: item, modalVisible: true});
//   };
//   render() {
//     const {images, loading} = this.props;
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           alignItems: 'center',
//         }}>
//         <KeyboardAvoidingView>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps={'always'}>
//             <View
//               style={{
//                 paddingBottom: 30,
//               }}>
//               <Form />
//               <View
//                 style={{
//                   width: Dimensions.get('window').width - 30,
//                   backgroundColor: '#FFFFFF',
//                   borderColor: '#d3d3d3',
//                   paddingBottom: 40,
//                   paddingTop: 20,
//                   borderRadius: 10,
//                   marginTop: 10,
//                   elevation: 4,
//                 }}>
//                 <TouchableOpacity
//                   onPress={this.showActionSheet}
//                   style={{
//                     height: 100,
//                     backgroundColor: '#fff',
//                     borderColor: '#d3d3d3',
//                     borderWidth: 1,
//                     borderStyle: 'dotted',
//                     borderRadius: 5,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                     paddingHorizontal: 10,
//                     marginHorizontal: 10,
//                     marginTop: 20,
//                   }}>
//                   <Icon name="md-cloud-upload" size={20} color={'#0046BE'} />
//                   <Text style={{color: '#0046BE', textTransform: 'uppercase'}}>
//                     Add Multiple Photos
//                   </Text>
//                 </TouchableOpacity>
//                 <View
//                   style={{
//                     marginHorizontal: 20,
//                     justifyContent: 'space-around',
//                     flexDirection: 'row',
//                     marginTop: 10,
//                     flexWrap: 'wrap',
//                   }}>
//                   {images
//                     ? images.map((each, index) => (
//                         <View
//                           key={index}
//                           style={{
//                             marginHorizontal: 20,
//                             borderColor: '#d3d3d3',
//                             borderWidth: 2,
//                           }}>
//                           <View style={{flexDirection: 'row'}}>
//                             <Image
//                               style={{
//                                 height: 100,
//                                 width: 100,
//                                 borderWidth: 0.5,
//                                 borderColor: '#fff',
//                                 borderRadius: 5,
//                                 left: 10,
//                               }}
//                               resizeMode={'cover'}
//                               source={
//                                 each && each
//                                   ? {
//                                       uri: `${each.uri}`,
//                                     }
//                                   : null
//                               }
//                             />
//                             <TouchableOpacity
//                               style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }}
//                               onPress={this.onDeleteSelected(index)}>
//                               <Icon size={20} name="close" color={'#000'} />
//                             </TouchableOpacity>
//                           </View>
//                           <TouchableOpacity
//                             style={{
//                               backgroundColor: '#0046BE',
//                               padding: 5,
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                             }}
//                             onPress={() => this.passDataToModal(index)}>
//                             <Text
//                               style={{
//                                 fontWeight: 'bold',
//                                 fontSize: 12,
//                                 color: '#fff',
//                               }}>
//                               Apply Filter
//                             </Text>
//                           </TouchableOpacity>
//                           <ImageFilter
//                             modalVisible={this.state.modalVisible}
//                             setModalVisible={this.setModalVisible}
//                             imageIndex={this.state.id}
//                           />
//                         </View>
//                       ))
//                     : null}
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={{
//                   height: 45,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#0046BE',
//                   borderWidth: 1,
//                   borderColor: '#0046BE',
//                   borderRadius: 4,
//                   marginTop: 10,
//                 }}
//                 onPress={this.handleSubmit}>
//                 {loading ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text
//                     style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
//                     Submit
//                   </Text>
//                 )}
//               </TouchableOpacity>
//               <ActionSheet
//                 ref={(o) => (this.ActionSheet = o)}
//                 title={
//                   <Text
//                     style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
//                     Upload a Photo
//                   </Text>
//                 }
//                 options={ActionSheetOptions}
//                 cancelButtonIndex={0}
//                 destructiveButtonIndex={3}
//                 onPress={(index) => {
//                   if (index == 1) {
//                     this.handleCamera();
//                   } else if (index == 2) {
//                     this.handleGallery();
//                   }
//                 }}
//               />
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }
// }
// const mapStateToProps = createStructuredSelector({
//   field: selectFormData,
//   images: selectImages,
//   loading: selectLoading,
//   response: selectImageResponse,
// });

// const mapDispatchToProps = {setFormField, setImagesData, imageFormSubmit};

// export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
