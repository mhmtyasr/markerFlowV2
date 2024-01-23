import http from "../../../utils/http";
import { IUserInfoDto } from "./types";

export const CurrentUserInfo = async (): Promise<IUserInfoDto> => {
  return http.get<null, IUserInfoDto>(
    "/services/app/Session/GetCurrentLoginInformations"
  );
};
