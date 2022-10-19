import { useContext, Dispatch, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction, TService } from "../../store";

export const Backups = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const service = useMemo(
    () =>
      me?.services?.find(
        (service) => service?._id?.toString() === me?.default_service
      ) as TService,
    []
  );

  useEffect(() => {
    if (me?.default_service !== service._id.toString())
      history.push("/resources");
  }, [me?.default_service]);

  const resource = service?.resources?.find(
    (resource) => resource?.uuid === resource_uuid
  );

  return <div>ddkdk</div>;
};
