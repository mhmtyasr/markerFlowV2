import React from "react";
import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/layout";
import { getRoutes } from "./utils/routes";
import Loading from "./components/loading";
import image from "./footerImage.png";
import { Button } from "antd";
import { useEvent } from "./contexts/EventContext";
import { IFrameMessageTypes } from "./enums/IFrameMessageTypes";

function App() {
  const AllRoutes: RouteObject[] = [];

  const { eventService } = useEvent();

  AllRoutes.push({
    path: "/",
    element: (
        <Layout />

    ),
    children: getRoutes().filter((route) => route.isPrivate),
  });

  AllRoutes.push({
    path: "/",
    element: <Outlet />,
    children: getRoutes().filter((route) => !route.isPrivate),
  });

  const Router = useRoutes(AllRoutes);

  return (
    <>
   
      <Loading />
      {Router}
      <img alt="" className="footerImage" src={image} />
    </>
  );
}

export default App;
