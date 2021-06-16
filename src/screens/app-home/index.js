import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {selectCurrentUser} from '../../redux/auth/auth.selectors';
import {selectToken} from '../../redux/app/app.selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

class Home extends Component {
  render() {
    const {token} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F3FBFF',
        }}>
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: 20,
              color: '#4A4A4A',
              textTransform: 'uppercase',
              fontWeight: '900',
              alignSelf: 'center',
            }}>
            Dashboard{' '}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.informationCard}
              onPress={() => this.props.navigation.navigate('Information')}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon
                  name="ios-information-circle"
                  size={50}
                  color={'#6383a8'}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#4A4A4A',
                    bottom: -20,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                  }}>
                  Information{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                paddingBottom: 10,
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
                  <Icon
                    name="md-shield-checkmark"
                    size={50}
                    color={'#9ec54d'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4A4A4A',
                      bottom: -20,
                      fontWeight: '600',
                      textTransform: 'uppercase',
                    }}>
                    Quality Check{' '}
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
                      size={50}
                      color={'#e36a5c'}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4A4A4A',
                        bottom: -20,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}>
                      Report
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    backgroundColor: '#F3FBFF',
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
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 4,
  },
});
