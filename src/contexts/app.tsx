import { createContext, useReducer, Reducer } from "react";
import { TUser } from "../store";

export type StateProps = {
  me?: TUser;
};

export const initialState: StateProps = {};

export const AppContext = createContext<StateProps>(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};
