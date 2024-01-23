import http from "./http";

export const post = async (url: string, data: any) => {
  return http.post(url, data);
};
export const put = async (url: string, data: any) => {
  return http.put(url, data);
};
export const get = async (url: string, data: any) => {
  return http.get(url, { params: data });
};
