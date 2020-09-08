import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import {userProfileGet} from '../../redux/auth/auth.actions';
import {
  selectCurrentUser,
  selectLoading,
} from '../../redux/auth/auth.selectors';
import {setFormField} from '../../redux/form/form.actions';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const checkList = [
  {
    id: 9,
    name: 'Walls',
    image: require('../../../assets/wall.jpg'),
    instruction: 'Wall Check Instructions',
    aspect: [2, 2],
    aspectRatio: 2 / 2,
  },
  {
    id: 8,
    name: 'Rebar Shape',
    image: require('../../../assets/rebar_shape.jpg'),
    instruction: 'Rebar Shape Check Instructions',
    aspect: [2, 3],
    aspectRatio: 2 / 3,
  },
  {
    id: 3,
    name: 'Rebar Cage',
    image: require('../../../assets/rebar_cage.jpg'),
    instruction: 'Rebar Cage Check Instructions',
    aspect: [1, 3],
    aspectRatio: 3 / 7,
  },

  {
    id: 4,
    name: 'Rebar Texture',
    image: require('../../../assets/rebar_texture.jpg'),
    instruction: 'Rebar Texture Check Instructions',
    aspect: [3, 1],
    aspectRatio: 4 / 1,
  },
  {
    id: 5,
    name: 'Solid Wall Area',
    image: require('../../../assets/solid_wall.jpg'),
    instruction: 'Solid Wall Area Check Instructions',
    aspect: [2, 3],
    aspectRatio: 2 / 3,
  },
];

class Index extends Component {
  componentDidMount() {
    if (this.props.current === null) {
      this.props.userProfileGet();
    }
  }

  render() {
    const {current, loading} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              color="blue"
              size="small"
              style={{justifyContent: 'center', alignItems: 'center'}}
            />
          ) : (
            <View style={{paddingBottom: 20}}>
              {checkList
                ? checkList.map((each, index) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={index}
                      style={styles.smallCards}
                      onPress={() =>
                        this.props.navigation.navigate('Instruction', {each})
                      }>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            color: '#4A4a4A',
                            fontWeight: 'bold',
                            fontSize: 15,
                            textTransform: 'uppercase',
                          }}>
                          {each.name}
                        </Text>
                        <Icons name="align-left" color="#000" size={30} />
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
              {/* <TouchableOpacity
            style={styles.smallCards}
            onPress={() => this.props.navigation.navigate('VideoForm')}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="videocam" size={60} color={'#FF5733'} />
              <Text
                style={{
                  fontSize: 20,
                  color: '#4A4A4A',
                  marginTop: 20,
                  fontWeight: 'bold',
                }}>
                Video Form
              </Text>
            </View>
          </TouchableOpacity> */}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  current: selectCurrentUser,
  loading: selectLoading,
});
const mapDispatchToProps = {setFormField, userProfileGet};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  smallCards: {
    height: 100,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#FFFFFF',
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    elevation: 4,
  },
});
