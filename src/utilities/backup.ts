import { AxiosError } from "axios";
import { TError, useErrorHandler } from ".";

export const useDownloadBackup = () => {
  const errorHandler = useErrorHandler();

  return (name: string, url: string) => {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        const tempUrl = URL.createObjectURL(file);
        const anchor = window.document.createElement("a");
        anchor.href = tempUrl;
        anchor.download = name;
        anchor.click();
      })
      .catch((error) => errorHandler(error as AxiosError<TError>));
  };
};
