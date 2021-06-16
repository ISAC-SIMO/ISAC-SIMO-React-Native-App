import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const ActivityIndicatorWrapper = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#6383a8" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ActivityIndicatorWrapper;
