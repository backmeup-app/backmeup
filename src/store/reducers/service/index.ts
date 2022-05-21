import { TAppState } from "../../../contexts";
import { updateService } from "./helpers";
import { TServiceAction } from "./types";

export * from "./types";

export const serviceReducer = (state: TAppState, action: TServiceAction) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      return {
        ...state,
        me: {
          ...state.me,
          services: state.me
            ? [...state.me.services, action.payload]
            : [action.payload],
        },
      };
    case "UPDATE_SERVICE":
      return updateService(state, action.payload);
    default:
      return state;
  }
};
