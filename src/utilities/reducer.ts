import { TAppState } from "../contexts";
import { TAppAction } from "../store";

export const combineReducers =
  (slices: any) => (state: TAppState, action: TAppAction) =>
    Object.keys(slices).reduce((currentState, props) => {
      const newState = slices[props](currentState, action);

      if (newState) {
        return { ...currentState, ...newState };
      }

      return currentState;
    }, state);
