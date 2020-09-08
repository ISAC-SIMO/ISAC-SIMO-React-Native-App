// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   Modal,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {Surface} from 'gl-react-native';
// import ImageFilters from 'react-native-gl-image-filters';
// import settings from './utils/settings';
// import Filter from './utils/filter';

// import {createStructuredSelector} from 'reselect';
// import {connect} from 'react-redux';
// import {
//   setFormField,
//   setImagesData,
//   imageFormSubmit,
//   setFilteredImageData,
// } from '../../../redux/form/form.actions';
// import {
//   selectFormData,
//   selectImages,
//   selectLoading,
// } from '../../../redux/form/form.selectors';

// import Icon from 'react-native-vector-icons/Ionicons';

// const width = Dimensions.get('window').width - 40;

// class index extends Component {
//   state = {
//     ...settings,
//     hue: 0,
//     blur: 0,
//     sepia: 0,
//     sharpen: 0,
//     negative: 0,
//     contrast: 1,
//     saturation: 1,
//     brightness: 1,
//     temperature: 6500,
//   };

//   saveImage = async () => {
//     var index = this.props.imageIndex;
//     console.log(index, 'index');
//     if (!this.image) return;

//     const result = await this.image.glView.capture();

//     const {images} = this.props;
//     console.log(images[this.props.imageIndex]);
//     this.props.setFilteredImageData({
//       key: 'uri',
//       value: result.localUri,
//       index,
//     });
//     this.props.setModalVisible(false);
//   };
//   setModalVisible = (value) => {
//     this.props.setModalVisible(value);
//   };
//   render() {
//     const {images} = this.props;
//     const id = this.props.imageIndex;
//     // console.log(images[id].uri, 'id');
//     return (
//       <View style={styles.container}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={this.props.modalVisible}
//           handleClick={this.setModalVisible}
//           onRequestClose={() => {
//             console.log('Modal closed');
//           }}>
//           <View style={styles.modalView}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignSelf: 'flex-start',
//                 marginTop: 10,
//               }}>
//               <TouchableOpacity
//                 style={{
//                   height: 50,
//                   width: 50,
//                 }}
//                 onPress={() => this.setModalVisible(false)}>
//                 <Icon size={24} name="md-arrow-back" />
//               </TouchableOpacity>
//               <Text style={{fontSize: 15, fontWeight: 'bold'}}>
//                 Image Filter
//               </Text>
//             </View>
//             <View>
//               {Object.keys(images).length > 0 &&
//               images[id] &&
//               images[id].uri ? (
//                 <Surface
//                   style={{width, height: width}}
//                   ref={(ref) => (this.image = ref)}>
//                   <ImageFilters {...this.state} width={width} height={width}>
//                     {{
//                       uri: `${images[id].uri}`,
//                     }}
//                   </ImageFilters>
//                 </Surface>
//               ) : null}
//               {settings.map((filter) => (
//                 <Filter
//                   key={filter.name}
//                   name={filter.name}
//                   minimum={filter.minValue}
//                   maximum={filter.maxValue}
//                   onChange={(value) => this.setState({[filter.name]: value})}
//                 />
//               ))}
//               <TouchableOpacity
//                 onPress={this.saveImage}
//                 style={{
//                   height: 45,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#0046BE',
//                   borderWidth: 1,
//                   borderColor: '#0046BE',
//                   borderRadius: 4,
//                   marginTop: 10,
//                 }}>
//                 <Text style={{fontSize: 13, color: '#fff'}}>Save</Text>
//               </TouchableOpacity>
//               <Text>{this.props.imageIndex}</Text>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   modalView: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 25,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });
// const mapStateToProps = createStructuredSelector({
//   field: selectFormData,
//   images: selectImages,
//   loading: selectLoading,
// });

// const mapDispatchToProps = {
//   setFormField,
//   setImagesData,
//   imageFormSubmit,
//   setFilteredImageData,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(index);
