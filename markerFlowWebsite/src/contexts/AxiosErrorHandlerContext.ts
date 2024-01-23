import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCommon } from "./CommonContext";
import { getToken } from "../utils/tokenHelper";
import http from "../utils/http";
import { notification } from "antd";

interface AxiosErrorHandlerProps {
  children: React.ReactNode;
}

const AxiosErrorHandler: React.FC<AxiosErrorHandlerProps> = ({ children }) => {
  const { handleSetGlobalLoading } = useCommon();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const reqInterceptor = http.interceptors.request.use(
      (config) => {
        handleSetGlobalLoading(true);
        const headerToken = getToken();
        if (headerToken) {
          config.headers.Authorization = `Bearer ${headerToken}`;
        }
        return config;
      },
      function (error) {
        handleSetGlobalLoading(false);
        return Promise.reject(error);
      }
    );

    const resInterceptor = http.interceptors.response.use(
      (response) => {
        if (
          response.config.method === "post" ||
          response.config.method === "put" ||
          response.config.method === "delete"
        ) {
          notification.success({
            message: "Success",
            duration: 1,
          });
        }
        handleSetGlobalLoading(false);
        if (response.status === 200) {
          return response.data.result;
        }
        return Promise.reject(response.data.result);
      },
      async (error) => {
        handleSetGlobalLoading(false);
        return Promise.reject(error);
      }
    );

    setIsInitialized(true);

    return () => {
      http.interceptors.response.eject(reqInterceptor);
      http.interceptors.response.eject(resInterceptor);
    };
  }, [handleSetGlobalLoading]);

  return isInitialized ? children : null;
};

export default AxiosErrorHandler;
