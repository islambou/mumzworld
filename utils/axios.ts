// config
import { API_URLS } from "../config";
import axios from "axios";
//import qs from 'qs';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API_URLS.base,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error.message || "Something went wrong")
);
axiosInstance.defaults.paramsSerializer = {
  /*serialize: (params: Record<string, unknown>) => {
    return qs.stringify(params);
  },*/
};
export default axiosInstance;
