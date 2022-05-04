import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TGetResources } from "./types";

export const useGetResources = () => {
  const [, dispatch] = useContext(AppContext);

  return async (service_uuid: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const url = `/services/${service_uuid}/resources`;
      const {
        data: { resources, pagination },
      } = await client().get<TGetResources>(url);

      dispatch({
        type: "GET_RESOURCES",
        payload: { resources, pagination, service_uuid },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
