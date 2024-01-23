export interface IUserInfoDto {
  user: User;
  tenant: Tenant;
}

export interface Tenant {
  tenancyName: string;
  name: string;
  id: number;
}

export interface User {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  id: number;
}
