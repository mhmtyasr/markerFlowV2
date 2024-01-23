import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          message: "toggle_sidebar",
        });
      }
    });
  }, []);

  return <></>;
};

ReactDOM.render(<Popup />, document.getElementById("root"));
