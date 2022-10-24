import { useContext, Dispatch } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { TAppAction, TBackup } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

export const useDeleteBackup = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const errorHandler = useErrorHandler();

  return async (backup: TBackup, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "delete.backup" });
    const url = `/resources/${resource_uuid}/backups/${backup.uuid}`;

    try {
      await client().delete(url);
      dispatch({
        type: "DELETE_BACKUP",
        payload: { resource_uuid, ...backup },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `#${backup.uuid.slice(0, 13)} deleted successfully`,
        },
      });
      onClose?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
