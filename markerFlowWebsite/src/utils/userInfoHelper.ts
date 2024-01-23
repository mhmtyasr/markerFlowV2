import { IUserUIModel } from "../models/uiModel/userUIModel";

const userInfoKey = 'userInfo';


export const getUserInfo = (): IUserUIModel | null => {
  let userInfo = sessionStorage.getItem(userInfoKey);
  if (!userInfo) {
    userInfo = localStorage.getItem(userInfoKey);
  }
  return userInfo ?  JSON.parse(userInfo!) : null; 
};

export const setUserInfo = (userInfo: IUserUIModel, remember: boolean) => {
  if (remember) {
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  } else {
    sessionStorage.setItem(userInfoKey, JSON.stringify(userInfo));
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem(userInfoKey);
  sessionStorage.removeItem(userInfoKey);
};
