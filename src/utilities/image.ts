import { Dispatch } from "react";
import { TAppAction } from "../store";

export const validateImage = (file: File, dispatch: Dispatch<TAppAction>) => {
  const allowedFormats = ["jpg", "jpeg", "png", "webp"];
  const format = file.type.split("/")[1].toLowerCase();

  if (!allowedFormats.includes(format)) {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { status: "error", text: "Invalid image format" },
    });
    return false;
  }

  if (file.size > 7000000) {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { status: "error", text: "Image is too large" },
    });
    return false;
  }

  return true;
};
