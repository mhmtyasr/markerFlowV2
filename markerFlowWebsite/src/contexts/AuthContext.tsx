import React, { createContext, useContext, useState } from "react";
import { IUserUIModel } from "../models/uiModel/userUIModel";
import { getToken, removeAccessToken, setAccessToken } from "../utils/tokenHelper";
import { getUserInfo, setUserInfo } from "../utils/userInfoHelper";

export interface AuthContextType {
  currentUser: IUserUIModel | null;
  handleSetCurrentUser: (user: IUserUIModel) => void;
  handleLogin: (
    token: string,
    remember: boolean,
  ) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

let AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [currentUser, setCurrentUser] = useState<IUserUIModel | null>(getUserInfo());

  const handleSetCurrentUser = (user: IUserUIModel): void => {
    setCurrentUser(user);
    setUserInfo(user,true);
  };

  const handleLogin = (
    token: string,
    remember: boolean,
  ): void => {
    setIsAuthenticated(true);
    setAccessToken(token, remember);
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    setCurrentUser(null!);
    removeAccessToken();
  };

  let value = {
    currentUser,
    handleSetCurrentUser,
    handleLogin,
    handleLogout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
