import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: Metrics.controlWidth,
    height: Metrics.controlHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  input: { flex: 1 },
});

const TextInputWrapper = ({ rightComponent, ...props }) => (
  <View style={styles.container}>
    <TextInput style={styles.input} {...props} />
    {rightComponent}
  </View>
);

export default TextInputWrapper;
