import * as types from './form.types';
import Snackbar from 'react-native-snackbar';
import {imageFormPost, videoFormPost} from '../../api/index';

export const setFormField = (payload) => ({
  type: types.SET_FORM_DATA,
  payload,
});

export const setImagesData = (payload) => ({
  type: types.SET_IMAGES_DATA,
  payload,
});
export const setFilteredImageData = (payload) => ({
  type: types.SET_FILTERED_IMAGE_DATA,
  payload,
});

export const setVideoData = (payload) => ({
  type: types.SET_VIDEO_DATA,
  payload,
});

export const saveReportData = (payload) => ({
  type: types.SAVE_REPORT,
  payload,
});
export const clearImageResponse = (payload) => ({
  type: types.CLEAR_IMAGE_RESPONSE,
  payload,
});

export const imageFormSubmit = (payload) => async (dispatch) => {
  dispatch({type: types.IMAGE_FORM_REQUEST, payload});
  try {
    // console.log(payload, 'payload');
    const response = await imageFormPost(payload);
    console.log(response.data, 'response');
    dispatch({
      type: types.IMAGE_FORM_SUCCESS,
      payload: response.data,
    });
    Snackbar.show({
      text: 'Image Processed Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return response.data;
  } catch (err) {
    dispatch({type: types.IMAGE_FORM_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const videoFormSubmit = (payload) => async (dispatch) => {
  dispatch({type: types.VIDEO_FORM_REQUEST, payload});
  try {
    // console.log(payload, 'payload');
    const response = await videoFormPost(payload);
    // console.log(response.data, 'response');
    dispatch({
      type: types.VIDEO_FORM_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({type: types.VIDEO_FORM_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    throw err;
  }
};
