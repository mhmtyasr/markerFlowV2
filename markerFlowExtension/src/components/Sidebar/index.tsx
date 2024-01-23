import React, { FC, useEffect } from "react";
import { useIframe } from "../../context/IFrameContext";
import { useUI } from "../../context/UIContext";
import Direction from "../../model/enums/SbDirection";

interface Props {
}
const Sidebar: FC<Props> = () => {
  const { onIFrameLoad } = useIframe();
  const { direction } = useUI();

  const dircetionStyle =
    direction === Direction.Right ? { right: 0 } : { left: 0 };

  return (
    <iframe
      id={"markerFlow-iframe"}
      allow="clipboard-write"
      style={{
        transition: "0.3s",
        width: "400px",
        height: "100vh",
        position: "fixed",
        top: "0px",
        border: "none",
        boxShadow: "-1px 0px 10px 1px #aaaaaa",
        zIndex: 2147483647,
        ...dircetionStyle,
      }}
      src={"http://localhost:3000/"}
      onLoad={(e) => {
        onIFrameLoad(e);       
      }}
    />
  );
};

export default Sidebar;
