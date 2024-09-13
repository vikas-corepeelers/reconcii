import axios from 'axios';
import { baseURL } from '../ServiceRequest/APIEndPoints';
const instance =  axios.create({
  baseURL: baseURL,
  responseType: 'json',
  timeout: 60000,
  headers: {
    langId: 1,
    Accept: 'application/json',
  },
});

export const handleError = ({ message, data, status })=>{
  return Promise.reject({message,data,status});
}
instance.interceptors.response.use(
  (response) => response,
  ({message, response: {data, status}}) => {
    return handleError({message, data, status});
  },
);

export default instance;
