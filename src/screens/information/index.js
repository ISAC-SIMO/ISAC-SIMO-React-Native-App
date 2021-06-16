import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Information </Text>
        <Text>Coming Soon! </Text>
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FBFF',
  },
});
