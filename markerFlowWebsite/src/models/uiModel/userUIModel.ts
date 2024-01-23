export interface IUserUIModel {
  user: IUserBaseUIModel;
  tenant: UTenantBaseUIModel;
}

export interface UTenantBaseUIModel {
  tenancyName: string;
  name: string;
  id: number;
}

export interface IUserBaseUIModel {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  id: number;
}
