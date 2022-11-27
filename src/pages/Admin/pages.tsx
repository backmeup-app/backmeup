import { Route } from "react-router-dom";
import { Resources, Settings, Account, Backups } from "../../components";

const pages = [
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
    component: <Account />,
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
