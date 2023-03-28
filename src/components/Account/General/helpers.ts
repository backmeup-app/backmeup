import React, { useContext, Dispatch } from "react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const useValidateFile = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (file: File) => {
    const allowedTypes = ["jpg", "png", "jpeg"];
    const type = file.type.split("/")[1].toLowerCase();

    if (!allowedTypes.includes(type)) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "error", text: "Invalid file format" },
      });
      return false;
    }

    if (file.size > 7000000) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "error", text: "Image is larger than 7MB" },
      });

      return false;
    }

    return true;
  };
};

export const useParseAvatar = (formik: any) => {
  const validateFile = useValidateFile();

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files ? event?.target?.files[0] : undefined;
    if (!file || !validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const avatar = document.querySelector(".avatar img");
      avatar?.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(file);
    formik.setFieldValue("avatar", file);
    return true;
  };
};
