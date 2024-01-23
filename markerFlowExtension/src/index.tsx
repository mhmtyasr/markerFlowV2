import React from "react";
import { App } from "./app";
import { IframeProvider } from "./context/IFrameContext";
import { UIProvider } from "./context/UIContext";

export const Root = () => {
  return (
    <IframeProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </IframeProvider>
  );
};
