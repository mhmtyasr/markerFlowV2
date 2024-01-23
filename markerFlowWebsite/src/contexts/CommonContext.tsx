import React, { createContext, useCallback, useContext, useState } from "react";
import { ExtensionMessageTypes } from "../enums/ExtensionMessageTypes";
import { getItem } from "../helpers";
import usePubSub from "./PubSubHook";
import { useBaseQuery } from "../hooks/query/_Base";
import { getUsers } from "../services/uiServices/UserService";
import { IUserBaseUIModel } from "../models/uiModel/userUIModel";
import { IPagedResponse } from "../services/uiServices/baseTypes";
import { IUserDto } from "../services/uiServices/UserService/types";

type PageInfo = {
  url: string;
  title: string;
};
export interface CommonContextType {
  pageInfo: PageInfo | null;
  isGlobalLoading: boolean;
  handleSetGlobalLoading: (isLoading: boolean) => void;
  userList: IUserBaseUIModel[];
}

let CommonContext = createContext<CommonContextType>(null!);

const CommonProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

  const handleSetGlobalLoading = useCallback((isLoading: boolean) => {
    setIsGlobalLoading(isLoading);
  }, []);

  const [pageInfo] = usePubSub<PageInfo | null>(
    ExtensionMessageTypes.PageInfo,
    getItem("pageInfo"),
    (e: PageInfo, param: any) => {
      return { url: e.url, title: e.title };
    },
    true
  );

  const { data: userList } = useBaseQuery<
    any,
    IPagedResponse<IUserDto>,
    IUserBaseUIModel[]
  >({
    service: getUsers,
    queryKeys: [],
    select: (data) => {
      return data.items.map((x) => {
        return {
          name: x.name,
          surname: x.surname,
          userName: x.fullName,
          emailAddress: x.emailAddress,
          id: x.id,
        } as IUserBaseUIModel;
      });
    },
  });


  let value: CommonContextType = {
    pageInfo,
    isGlobalLoading,
    handleSetGlobalLoading,
    userList: userList || [],
  };
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

const useCommon = (): CommonContextType => {
  return useContext<CommonContextType>(CommonContext);
};

export { useCommon, CommonProvider };
