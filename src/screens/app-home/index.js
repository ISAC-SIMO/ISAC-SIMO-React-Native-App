import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {selectCurrentUser} from '../../redux/auth/auth.selectors';
import {selectToken} from '../../redux/app/app.selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Home extends Component {
  render() {
    const {token} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 25,
              color: '#4A4A4A',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            Dashboard
          </Text>
        </View>
        <TouchableOpacity
          style={styles.informationCard}
          onPress={() => this.props.navigation.navigate('Information')}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Icon name="ios-information-circle" size={60} color={'#8553C6'} />
            <Text
              style={{
                fontSize: 20,
                color: '#4A4A4A',
                marginTop: 20,
                fontWeight: 'bold',
              }}>
              Information
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={
              token === 'null' ? styles.informationCard : styles.smallCards
            }
            onPress={() => this.props.navigation.navigate('Quality')}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="md-shield-checkmark" size={60} color={'#09C6B9'} />
              <Text
                style={{
                  fontSize: 20,
                  color: '#4A4A4A',
                  marginTop: 20,
                  fontWeight: 'bold',
                }}>
                Quality Check
              </Text>
            </View>
          </TouchableOpacity>
          {token === 'null' ? null : (
            <TouchableOpacity
              style={styles.smallCards}
              onPress={() => this.props.navigation.navigate('Report')}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon
                  name="ios-newspaper-outline"
                  size={60}
                  color={'#FF5733'}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#4A4A4A',
                    marginTop: 20,
                    fontWeight: 'bold',
                  }}>
                  Report
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectCurrentUser,
  token: selectToken,
});
const mapDispatchToProps = {userProfileGet};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  heading: {
    marginTop: 20,
    marginBottom: 50,
  },
  informationCard: {
    height: 150,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  smallCards: {
    height: 150,
    width: Dimensions.get('window').width / 2 - 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    elevation: 4,
  },
});
