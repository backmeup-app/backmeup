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
  let hours = dateObject.getHours();
  const extension = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  let minutes = String(dateObject.getMinutes());
  minutes = minutes.length === 1 ? "0" + minutes : minutes;

  return `${day} ${parseDateExtension(
    String(date)
  )} ${month} ${year}. ${hours}:${minutes} ${extension}`;
};

const parseDateExtension = (date: string) => {
  const extensions: { [key: string]: string } = {
    "1": "st",
    "2": "nd",
    "3": "rd",
  };
  const lastChar = date.slice(date.length - 1);
  return Number(date) > 10
    ? date + "th"
    : extensions[lastChar]
    ? date + extensions[lastChar]
    : date + "th";
};
