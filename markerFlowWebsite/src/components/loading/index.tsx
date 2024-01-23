import { Spin } from "antd";
import React from "react";
import { useCommon } from "../../contexts/CommonContext";


const Loading = () => {
  const { isGlobalLoading } = useCommon();

  return <Spin spinning={isGlobalLoading} fullscreen />;
};

export default Loading;
