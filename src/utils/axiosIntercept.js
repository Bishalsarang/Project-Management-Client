import axios from 'axios';
import { getValue } from './localstorage';
const fetcher = () => {
  // Create instance
  const instance = axios.create();

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = getValue('token');

    config.headers.Authorization = token ? token : '';

    return config;
  });

  return instance;
};

export default fetcher();
