import {RNCamera} from 'react-native-camera';
export const settings = [
  {
    name: 'exposure',
    minValue: -1,
    maxValue: 1,
  },
  {
    name: 'brightness',
    minValue: 0,
    maxValue: 5,
  },
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: 'saturation',
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: 'temperature',
    minValue: 0.0,
    maxValue: 40000.0,
  },
  {
    name: 'hue',
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: 'sepia',
    minValue: -5,
    maxValue: 5,
  },
  {
    name: 'negative',
    minValue: -2.0,
    maxValue: 2.0,
  },
];
export const prevSetting = {
  hue: 0,
  blur: 0,
  sepia: 0,
  sharpen: 0,
  negative: 0,
  contrast: 1,
  saturation: 1,
  brightness: 1,
  temperature: 6500,
  exposure: 0,
};

export const settingsToApply = {
  hue: 3.15,
  sepia: 1,
  negative: 1,
  contrast: 2,
  saturation: 0,
  brightness: 1.3,
  temperature: 8500,
  exposure: 0.5,
};
export const whiteBalance = [
  RNCamera.Constants.WhiteBalance.auto,
  RNCamera.Constants.WhiteBalance.sunny,
  RNCamera.Constants.WhiteBalance.cloudy,
  RNCamera.Constants.WhiteBalance.shadow,
  RNCamera.Constants.WhiteBalance.incandescent,
  RNCamera.Constants.WhiteBalance.fluorescent,
];
