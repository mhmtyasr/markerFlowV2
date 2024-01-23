
import http from "../../../utils/http";
import { IAuthReqDto, IAuthResDto } from "./types";
  
  export const Authenticate = async (
    param: IAuthReqDto
  ): Promise<IAuthResDto> => {
    return http.post<null, IAuthResDto>("TokenAuth/Authenticate", param);
  };
  
  