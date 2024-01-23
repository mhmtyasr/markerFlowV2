// Not-tested

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

const baseUrl = process.env.REACT_APP_API_URL || "";

const http = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-store",
    "Accept-Language": "en-US",
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  },
});


export const post = <T, R>(
  path: string,
  data: T,
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse<R>> => {
  return http.post(path, data, options);
};

export const put = <T, R>(
  path: string,
  data: T,
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse<R>> => {
  return http.put(path, data, options);
};

export const get = <P, R>(
  path: string,
  params?: P
): Promise<AxiosResponse<R>> => {
  return http.get(path, { params });
};

export const del = <P, R>(
  path: string,
  params?: P
): Promise<AxiosResponse<R>> => {
  return http.delete(path, { params });
};

export default http;
