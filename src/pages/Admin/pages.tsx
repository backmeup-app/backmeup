import { Route } from "react-router-dom";
import {
  Overview,
  Resources,
  Settings,
  Profile,
  Notifications,
  Backups,
} from "../../components";

const pages = [
  {
    path: "/overview",
    component: <Overview />,
  },
  {
    path: "/resources/:resource_uuid/backups",
    component: <Backups />,
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
    path: "/account",
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
          <Route key={index} path={path} exact={true}>
            {component}
          </Route>
        ))}
      </>
    );
  };
};
