import Login from "../pages/login";
import SignUp from "../pages/signup";
import Topics from "../pages/topics";
import Profile from "../pages/profile";
import CreateTopic from "../pages/createTopic";
import Comments from "../pages/comments";
import { ReactElement } from "react";
import CreateComment from "../pages/createComment";

export interface RouteType {
  name: string;
  path: string;
  element: ReactElement;
  isPrivate: boolean;
}

const routes: RouteType[] = [
  {
    name: "Login",
    path: "/login",
    element: <Login />,
    isPrivate: false,
  },
  {
    name: "Signup",
    path: "/signup",
    element: <SignUp />,
    isPrivate: false,
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
  },
  {
    name: "Topics",
    path: "/",
    element: <Topics />,
    isPrivate: true,
  },
  {
    name: "Comments",
    path: "/comments",
    element: <Comments />,
    isPrivate: true,
  },
  {
    name: "Create Topic",
    path: "/createtopic",
    element: <CreateTopic />,
    isPrivate: true,
  },
  {
    name: "Create Comment",
    path: "/createcomment",
    element: <CreateComment />,
    isPrivate: true,
  },

];

export const getRoutes = (): Array<RouteType> => {
  return routes;
};

export default routes;
