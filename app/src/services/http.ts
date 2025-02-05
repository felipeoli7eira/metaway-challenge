import axios, { AxiosStatic, InternalAxiosRequestConfig } from "axios";
import ENVS from "./../envs";
import useAuthToken from "../hooks/auth/useAuthToken";

const { hasToken, getAuthTokenStateValue } = useAuthToken();

const http: AxiosStatic = axios;

axios.defaults.baseURL = ENVS.API_URL;

axios.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.common["Accept"] = "*/*";

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {

  if (hasToken()) {
    const token = getAuthTokenStateValue().token;

    config.headers.Authorization = 'Bearer '.concat(token)
  }

  return Promise.resolve(config);
}, error => Promise.reject({HttpServiceInterceptorsError: error}))

export default http;
