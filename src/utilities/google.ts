export const redirectGoogleAuth = (state?: string) => {
  const apiUrl = String(
    process.env.REACT_APP_BACKMEUP_API ?? window.__env__.REACT_APP_BACKMEUP_API
  );
  let googleAuthUrl = apiUrl + "/accounts/google";
  googleAuthUrl = state ? googleAuthUrl + `?state=${state}` : googleAuthUrl;
  window.location.href = googleAuthUrl;
};
