import { Route } from "react-router-dom";
import { ApiKeys, Overview, Resources, Settings } from "../../components";

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
    path: "/api-keys",
    component: <ApiKeys />,
  },
  {
    path: "/settings",
    component: <Settings />,
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
