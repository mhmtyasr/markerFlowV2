export interface IAuthReqDto {
    tenancyName?: string;
    userNameOrEmailAddress: string;
    password: string;
  }
  
  export interface IAuthResDto {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  }
  