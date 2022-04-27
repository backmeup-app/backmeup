import { createContext, Dispatch, useReducer, Reducer, useMemo } from "react";
import { stateReducer, TAppAction, TUser } from "../store";

export type TAppState = {
  me?: TUser;
};

export const initialState: TAppState = {};

export const AppContext = createContext<
  [TAppState, Dispatch<TAppAction>] | null
>(null);

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
