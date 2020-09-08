import produce from 'immer';
import * as types from './form.types';

const INITIAL_STATE = {
  loading: false,
  error: {},
  formData: {
    title: '',
    description: '',
    lat: '',
    lng: '',
    project_id: 1,
  },
  images: [],
  video: [],
  imageResponse: null,
  videoResponse: null,
  savedReport: [],
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
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
    }
  });

export default reducer;
