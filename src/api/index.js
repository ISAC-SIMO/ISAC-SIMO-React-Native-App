import Axios from 'axios';

const baseURL = 'https://www.isac-simo.net/api/';

export const api = Axios.create({
  baseURL,
  timeout: 10000,
});

export const loginPost = (data) => api.post('auth/', data);

export const registerPost = (data) => {
  const formData = new FormData();
  Object.keys(data).map((each) => {
    formData.append(each, data[each]);
  });
  return api.post('register/', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: '',
    },
  });
};

export const profileGet = () => api.get('profile/');

export const imageFormPost = (data) => {
  const formData = new FormData();
  Object.keys(data).map((each) => {
    formData.append(each, data[each]);
  });
  return api.post('image/', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const videoFormPost = (data) => {
  const formData = new FormData();
  Object.keys(data).map((each) => {
    formData.append(each, data[each]);
  });
  // console.log(formData, 'hello');
  return api.post('video/', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};
