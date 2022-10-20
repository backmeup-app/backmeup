import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TAppAction, TBackup } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TGetBackupsResponse } from "./types";

export const useGetBackups = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const history = useHistory();
  const errorHandler = useErrorHandler();

  return async () => {
    const defaultService = me?.services?.find(
      (service) => service._id.toString() === me?.default_service?.toString()
    );
    const resource = defaultService?.resources?.find(
      (resource) => resource.uuid === resource_uuid
    );

    if (!resource) return history.push("/resources");

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "get.backups" });

    let url = `/resources/${resource.uuid}/backups`;
    resource.backups = resource.backups as TBackup[];
    url =
      resource?.backups?.length > 0
        ? url + `?after_uuid=${resource.backups[resource.backups.length - 1]}`
        : url;

    try {
      const {
        data: { backups },
      } = await client().get<TGetBackupsResponse>(url);
      dispatch({
        type: "GET_BACKUPS",
        payload: { backups, resource_uuid: resource.uuid },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
  };
};
