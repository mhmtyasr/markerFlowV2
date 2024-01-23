import http from "../../../utils/http";
import { IPagedResponse } from "../baseTypes";
import { IUserDto } from "./types";

export const getUsers = async (): Promise<IPagedResponse<IUserDto>> => {
  return http.get("services/app/User/GetAll");
};
