import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  Reducer,
  useMemo,
} from "react";
import { stateReducer, TAppAction, TUser } from "../store";

export type TAppNotification = {
  status: "info" | "success" | "error";
  text: string;
};

export type TAppState = {
  me?: TUser;
  loading?: boolean;
  notification?: TAppNotification;
  networkOperation?: string;
  browserWidth?: number;
  onScroll?: () => void;
};

export type TPagination = {
  currentPage: number;
  maxPages: number;
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

  useEffect(() => {
    dispatch({ type: "SET_BROWSER_WIDTH", payload: window.innerWidth });
    window.addEventListener("resize", () => {
      dispatch({ type: "SET_BROWSER_WIDTH", payload: window.innerWidth });
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const store = useMemo(
    (): [TAppState, Dispatch<TAppAction>] => [state, dispatch],
    [state]
  );

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
