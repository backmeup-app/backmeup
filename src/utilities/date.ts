const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "November",
  "Dec",
];

export const parseDate = (dt: string) => {
  const dateObject = new Date(dt);
  const year = dateObject.getFullYear();
  const month = months[Number(dateObject.getMonth())];
  const day = days[Number(dateObject.getDay())];
  const date = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${day} ${date} ${month} ${year}. ${hours}:${minutes}`;
};
