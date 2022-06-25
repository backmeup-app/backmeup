import { Route } from "react-router-dom";
import {
  Overview,
  Resources,
  Settings,
  Profile,
  Notifications,
} from "../../components";

const pages = [
  {
    path: "/overview",
    component: <Overview />,
  },
  {
    path: "/resources",
    component: <Resources />,
  },
  {
    path: "/settings",
    component: <Settings />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/notifications",
    component: <Notifications />,
  },
];

export const useRenderPages = () => {
  return () => {
    return (
      <>
        {pages.map(({ path, component }, index) => (
          <Route key={index} path={path}>
            {component}
          </Route>
        ))}
      </>
    );
  };
};
