//form reducer
import produce from 'immer';
import * as types from './form.types';

const INITIAL_STATE = {
  loading: false,
  error: {},
  images: [],
  video: [],
  imageResponse: null,
  videoResponse: null,
  savedReport: [],
  crowdSource: {},
  formData: {
    object_type: '',
    image_type: '',
    username: '',
  },
  csImageResponse: null,
  editBoolean: false,
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_FORM_DATA:
        draft.formData[action.payload.key] = action.payload.value;
        break;
      case types.SET_IMAGES_DATA:
        draft.images = action.payload;
        break;
      case types.SET_FILTERED_IMAGE_DATA:
        draft.images[action.payload.index][action.payload.key] =
          action.payload.value;
        break;
      case types.SET_VIDEO_DATA:
        draft.video = action.payload;
        break;
      case types.IMAGE_FORM_REQUEST:
        draft.loading = true;
        break;
      case types.IMAGE_FORM_SUCCESS:
        draft.imageResponse = action.payload;
        draft.loading = false;
        break;
      case types.IMAGE_FORM_FAILURE:
        draft.loading = false;
        break;
      case types.VIDEO_FORM_REQUEST:
        draft.loading = true;
        break;
      case types.VIDEO_FORM_SUCCESS:
        draft.videoResponse = action.payload;
        draft.loading = false;
        break;
      case types.VIDEO_FORM_FAILURE:
        draft.loading = false;
        break;
      case types.SAVE_REPORT:
        draft.savedReport = action.payload;
        break;
      case types.CLEAR_IMAGE_RESPONSE:
        draft.imageResponse = INITIAL_STATE.imageResponse;
        break;
      case types.GET_OBJECT_TYPE_REQUEST:
        draft.loading = true;
        break;
      case types.GET_OBJECT_TYPE_SUCCESS:
        draft.loading = false;
        draft.crowdSource = action.payload;
        break;
      case types.GET_OBJECT_TYPE_FAILURE:
        draft.loading = false;
        break;
      case types.CROWDSOURCE_FORM_REQUEST:
        draft.loading = true;
        break;
      case types.CROWDSOURCE_FORM_SUCCESS:
        draft.csImageResponse = action.payload;
        draft.loading = false;
        break;
      case types.CROWDSOURCE_FORM_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_CROWDSOURCE_REQUEST:
        draft.loading = true;
        break;
      case types.DELETE_CROWDSOURCE_SUCCESS:
        draft.loading = false;
        break;
      case types.DELETE_CROWDSOURCE_FAILURE:
        draft.loading = false;
        break;
      case types.SET_EDIT_BOOLEAN:
        draft.editBoolean = action.payload;
        break;
      case types.CLEAR_CROWDSOURCE_FIELD:
        draft.formData = INITIAL_STATE.formData;
        draft.images = INITIAL_STATE.images;
        break;
    }
  });

export default reducer;
