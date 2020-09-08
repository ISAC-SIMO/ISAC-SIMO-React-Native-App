import { Dimensions } from 'react-native';
// import Constants from 'expo-constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const statusBarHeight = 24; // Constants.statusBarHeight;

const widthRatio = screenWidth / 375;
const heightRatio = screenHeight / 812;

const controlWidth = 324 * widthRatio;
const controlHeight = 52 * widthRatio;
const headingTop = 22 * heightRatio;
const subHeadingTop = 20 * heightRatio;

export const Metrics = {
  screenWidth,
  screenHeight,
  statusBarHeight,
  controlWidth,
  controlHeight,
  headingTop,
  subHeadingTop,
};

export default Metrics;
