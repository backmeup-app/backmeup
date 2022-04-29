import { createContext, Dispatch, useReducer, Reducer, useMemo } from "react";
import { stateReducer, TAppAction, TUser } from "../store";

export type TAppNotification = {
  status: "info" | "success" | "error";
  text: string;
};

export type TAppState = {
  me?: TUser;
  loading?: boolean;
  notification?: TAppNotification;
};

export const initialState: TAppState = {};

const dispatch: any = {};

export const AppContext = createContext<[TAppState, Dispatch<TAppAction>]>([
  initialState,
  dispatch,
]);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<TAppState, TAppAction>>(
    stateReducer,
    initialState
  );

  const store = useMemo(
    (): [TAppState, Dispatch<TAppAction>] => [state, dispatch],
    [state]
  );

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
