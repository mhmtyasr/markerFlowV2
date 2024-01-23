import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Root } from ".";


/** * app is the root element of the extension */
let app: HTMLDivElement; /** * function to toggle the sidebar */
const addRoot = () => {
  app = document.createElement("div");
  app.id = "maerkerFlow-root";
  app.classList.add("maerkerFlow-root");
  app.style.borderTopRightRadius = "0px";
  app.style.borderBottomRightRadius = "0px";
  app.style.setProperty("z-index", "2147483645", "important");
  document.body.appendChild(app);
  app.attachShadow({ mode: "open" });
  const a = document.createElement("div");
  a.id = "maerkerFlow-shadow-root";

  app.shadowRoot!.appendChild(a);
  ReactDOM.render(<Root />, a);
};
addRoot();
