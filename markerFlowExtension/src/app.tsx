import React from "react";
import { useEffect, useState } from "react";
import CreateOrEditAnnotation from "./components/CreateOrEditAnnotation";
import Draw from "./components/Draw";
import Sidebar from "./components/Sidebar";
import {  useIframe } from "./context/IFrameContext";
import usePubSub from "./hook/pubsub";
import { IFrameMessageTypes } from "./model/enums/IFrameMessageTypes";
import "./app.css"

enum ExtensionOpenMode {
  sidebar = "sidebar",
  none = "none",
}
export const App = () => {
  const [extensionOpenMode, setExtensionOpenMode] = useState(
    ExtensionOpenMode.none
  );
  const { eventService } = useIframe();

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === "toggle_sidebar") toggle();
    });
  }, []);

 

  usePubSub<string>(
    IFrameMessageTypes.CloseSidebar,
    "",
    (e: string, param: any) => {
      chrome.storage.local.set({ isSidebarOpen: false });
      setExtensionOpenMode(ExtensionOpenMode.none);
    }
  );

  function toggle() {
    if (extensionOpenMode === ExtensionOpenMode.sidebar) {
      setExtensionOpenMode(ExtensionOpenMode.none);
      chrome.storage.local.set({ isSidebarOpen: false });
    } else {
      setExtensionOpenMode(ExtensionOpenMode.sidebar);
      chrome.storage.local.set({ isSidebarOpen: true });
    }
  }

  usePubSub<string>(
    IFrameMessageTypes.RedirectTo,
    "",
    (e: string) => {
      window.location.href = e;
    }
  );



  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={chrome.runtime.getURL("/assets/app.css")}
      ></link>
      
      {extensionOpenMode !== ExtensionOpenMode.none ? (
        <>
          <div
            style={{
              display:
                extensionOpenMode === ExtensionOpenMode.sidebar
                  ? "block"
                  : "none",
            }}
          >
            
            <Sidebar/>
            <Draw />
            <CreateOrEditAnnotation />
           
          </div>
        </>
      ) : null}
    </>
  );
};
