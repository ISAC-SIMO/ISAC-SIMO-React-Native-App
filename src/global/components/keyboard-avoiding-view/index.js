import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const KeyboardAvoidingViewWrapper = props => (
  <KeyboardAvoidingView behavior="padding" {...props} />
);

export default KeyboardAvoidingViewWrapper;
