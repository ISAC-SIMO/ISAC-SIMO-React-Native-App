import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {setFormField} from '../../../redux/form/form.actions';
import {selectFormData} from '../../../redux/form/form.selectors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Form extends Component {
  constructor(props) {
    super(props);
    this.titleInput,
      this.descInput,
      this.latInput,
      this.lonInput,
      (this.state = {});
  }
  componentDidMount() {
    this.getLatLong();
  }
  getLatLong = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ISAC App',
          message: 'Please grant permission for geolocation ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            this.props.setFormField({
              key: 'lat',
              value: JSON.stringify(position.coords.latitude),
            });
            this.props.setFormField({
              key: 'lng',
              value: JSON.stringify(position.coords.longitude),
            });
          },

          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        // }
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  onHandleChange = (key, value) => {
    this.props.setFormField({
      key,
      value,
    });
  };
  render() {
    const {field} = this.props;
    return (
      <View style={styles.formContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
          General Question
        </Text>
        <View
          style={{
            borderColor: '#d3d3d3',
            marginHorizontal: 16,
            paddingTop: 10,
          }}>
          <Text>Title*</Text>
          <TextInput
            style={{
              height: 45,
              borderWidth: 1,
              borderColor: '#000000',
              paddingHorizontal: 16,
              borderRadius: 5,
            }}
            ref={(ref) => {
              this.titleInput = ref;
            }}
            returnKeyType={'next'}
            onSubmitEditing={() => this.descInput.focus()}
            value={field.title}
            onChangeText={(text) => this.onHandleChange('title', text)}
            placeholder={'Title'}
            keyboardType={'default'}
          />
          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {errors && errors.email !== '' ? (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View> */}
          <Text style={{marginTop: 20}}>Description*</Text>
          <TextInput
            style={{
              height: 100,
              borderWidth: 1,
              borderColor: '#000000',
              borderRadius: 5,
            }}
            ref={(ref) => {
              this.descInput = ref;
            }}
            textAlignVertical={'top'}
            value={field.desc}
            onChangeText={(text) => this.onHandleChange('description', text)}
            placeholder={'Description'}
            returnKeyType={'next'}
            multiline={true}
          />
          <Text style={{marginTop: 20}}>Latitude*</Text>
          <TextInput
            style={{
              height: 45,
              borderWidth: 1,
              borderColor: '#000000',
              paddingHorizontal: 16,
              borderRadius: 5,
            }}
            ref={(ref) => {
              this.latInput = ref;
            }}
            onSubmitEditing={() => this.lonInput.focus()}
            value={field.lat}
            keyboardType={'numeric'}
            onChangeText={(text) => this.onHandleChange('lat', parseInt(text))}
            placeholder={'Latitude'}
            returnKeyType={'next'}
          />
          <Text style={{marginTop: 20}}>Longitude*</Text>
          <TextInput
            style={{
              height: 45,
              borderWidth: 1,
              borderColor: '#000000',
              paddingHorizontal: 16,
              borderRadius: 5,
            }}
            ref={(ref) => {
              this.lonInput = ref;
            }}
            value={field.lng}
            keyboardType={'numeric'}
            onChangeText={(text) => this.onHandleChange('lng', parseInt(text))}
            placeholder={'Longitude'}
            returnKeyType={'done'}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
              width: 200,
              alignSelf: 'center',
              borderColor: '#0046BE',
              borderWidth: 2,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={this.getLatLong}>
            <Icon name="location-outline" size={20} color={'#0046BE'} />
            <Text style={{fontSize: 15, color: '#0046BE'}}>
              Get My Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 4,
  },
});

const mapStateToProps = createStructuredSelector({
  field: selectFormData,
});

const mapDispatchToProps = {setFormField};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
