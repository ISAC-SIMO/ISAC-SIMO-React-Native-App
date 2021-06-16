// qulaity check images related async operations goes here
import * as types from './form.types';
import Snackbar from 'react-native-snackbar';
import {
  imageFormPost,
  videoFormPost,
  crowdSourceGet,
  crowdSourceImageFormPost,
  deleteCrowdSource,
  crowdSourceImageFormUpdate,
} from '../../api/index';

export const setFormField = payload => ({
  type: types.SET_FORM_DATA,
  payload,
});

export const setImagesData = payload => ({
  type: types.SET_IMAGES_DATA,
  payload,
});
export const setFilteredImageData = payload => ({
  type: types.SET_FILTERED_IMAGE_DATA,
  payload,
});

export const setVideoData = payload => ({
  type: types.SET_VIDEO_DATA,
  payload,
});

export const saveReportData = payload => ({
  type: types.SAVE_REPORT,
  payload,
});
export const clearImageResponse = payload => ({
  type: types.CLEAR_IMAGE_RESPONSE,
  payload,
});

export const imageFormSubmit = payload => async dispatch => {
  dispatch({type: types.IMAGE_FORM_REQUEST, payload});
  try {
    console.log(payload, 'payload');
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

export const videoFormSubmit = payload => async dispatch => {
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

export const getObjectTypes = () => async dispatch => {
  dispatch({type: types.GET_OBJECT_TYPE_REQUEST});
  try {
    const response = await crowdSourceGet();
    dispatch({
      type: types.GET_OBJECT_TYPE_SUCCESS,
      payload: response.data,
    });
    console.log(response.data, 'response');
    return response.data;
  } catch (err) {
    dispatch({type: types.GET_OBJECT_TYPE_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const crowdSourceImageFormSubmit = payload => async dispatch => {
  dispatch({type: types.CROWDSOURCE_FORM_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await crowdSourceImageFormPost(payload);
    console.log(response.data, 'response');
    dispatch({
      type: types.CROWDSOURCE_FORM_SUCCESS,
      payload: response.data,
    });
    Snackbar.show({
      text: 'Data added Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return response.data;
  } catch (err) {
    dispatch({type: types.CROWDSOURCE_FORM_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const crowdSourceImageFormDataUpdate = payload => async dispatch => {
  dispatch({type: types.CROWDSOURCE_FORM_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await crowdSourceImageFormUpdate(payload);
    console.log(response.data, 'response');
    dispatch({
      type: types.CROWDSOURCE_FORM_SUCCESS,
      payload: response.data,
    });
    Snackbar.show({
      text: 'Data Updated Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return response.data;
  } catch (err) {
    dispatch({type: types.CROWDSOURCE_FORM_FAILURE, payload: err});
    Snackbar.show({
      text: JSON.stringify(err.response.data),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const deleteCrowdsourceData = payload => async dispatch => {
  dispatch({type: types.DELETE_CROWDSOURCE_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await deleteCrowdSource(payload);
    console.log(response.data, 'response');
    dispatch({
      type: types.DELETE_CROWDSOURCE_SUCCESS,
      payload: response.data,
    });
    Snackbar.show({
      text: 'Data Deleted Successfully !!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return response.data;
  } catch (err) {
    dispatch({type: types.DELETE_CROWDSOURCE_FAILURE, payload: err});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const setEditBool = payload => ({
  type: types.SET_EDIT_BOOLEAN,
  payload,
});

export const clearCrowdSourceField = payload => ({
  type: types.CLEAR_CROWDSOURCE_FIELD,
  payload,
});
