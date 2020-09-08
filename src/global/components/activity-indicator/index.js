import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ActivityIndicatorWrapper = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ActivityIndicatorWrapper;
