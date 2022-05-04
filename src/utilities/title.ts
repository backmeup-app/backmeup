export const parseTitle = (pathname: string) => {
  const formattedPathname = pathname.slice(1).replace(/-/g, " ");
  const pathSplits = formattedPathname
    .split(" ")
    .map(
      (slice) => slice.charAt(0).toUpperCase() + slice.slice(1).toLowerCase()
    );
  return pathSplits.join(" ");
};
