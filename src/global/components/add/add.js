/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Switch,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {selectToken} from '../../../redux/app/app.selectors';
import {selectCurrentUser} from '../../../redux/auth/auth.selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

class AddButton extends Component {
  state = {
    modalVisible: false,
    switchValue: false,
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  onAdd = () => {
    const {token} = this.props;
    if (token == 'null') {
      this.props.navigate('AddCrowd', {goback: this.props.goback});
      this.setState({modalVisible: false});
    } else {
      this.props.navigate('Crowdsource', {goback: this.props.goback});
      this.setState({modalVisible: false});
    }
  };
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value});
    //state changes according to switch
    //which will result in re-render the text
  };
  render() {
    const {modalVisible, switchValue} = this.state;
    return (
      <>
        <TouchableOpacity
          style={{height: 80, width: 80, bottom: -25}}
          onPress={switchValue ? this.onAdd : () => this.setModalVisible(true)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              // onPress={this.onAdd}
              onPress={
                switchValue ? this.onAdd : () => this.setModalVisible(true)
              }>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 65,
                  height: 65,
                  borderRadius: 65 / 2,
                  borderWidth: 10,
                  borderColor: '#F3FBFF',
                  bottom: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#e36a5c',
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                    width: 55,
                    height: 55,
                    borderRadius: 55 / 2,
                  }}>
                  <Icon
                    name="ios-add"
                    size={36}
                    color="#fff"
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    // alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}>
                    <Icon name="arrow-back" size={25} color="#4A4A4A" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: '#4A4A4A',
                      alignSelf: 'center',
                      left: Dimensions.get('window').width / 2 - 140,
                    }}>
                    Privacy Terms and Conditions
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <Icon
                    name="md-shield-checkmark"
                    size={20}
                    color={'#9ec54d'}
                    style={{marginTop: 2}}
                  />

                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 16,
                      color: '#4A4A4A',
                      alignSelf: 'center',
                      left: 20,
                    }}>
                    All Images Copyright will be transferred {'\n'} to
                    ISAC-SIMO.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <Icon
                    name="md-shield-checkmark"
                    size={20}
                    color={'#9ec54d'}
                    style={{marginTop: 2, right: 2}}
                  />

                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 16,
                      color: '#4A4A4A',
                      alignSelf: 'center',
                      left: 20,
                    }}>
                    I agree that it can be used and shared {'\n'} freely as per
                    ISAC-SIMO need.
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 100,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 16,
                    }}>
                    <Text
                      style={{
                        color: '#555',
                        fontSize: 15,
                        marginTop: 40,
                        margin: 16,
                      }}>
                      I agree to terms and conditions
                    </Text>
                    <Switch
                      style={{marginTop: 30}}
                      onValueChange={this.toggleSwitch}
                      value={this.state.switchValue}
                    />
                  </View>
                  {this.state.switchValue === false ? (
                    <TouchableOpacity
                      disabled={this.state.disabled}
                      style={{
                        marginTop: 20,
                        height: 44,
                        backgroundColor: '#d3d3d3',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        marginHorizontal: 16,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        Let's Go
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        height: 44,
                        backgroundColor: '#6383a8',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        marginHorizontal: 16,
                      }}
                      onPress={this.onAdd}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        Let's Go
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: Dimensions.get('window').height - 20,
    width: Dimensions.get('window').width - 20,
    margin: 5,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
const mapStateToProps = createStructuredSelector({
  token: selectToken,
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
