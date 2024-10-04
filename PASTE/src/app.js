import { updatePaste, createPaste } from "./features/paste/pasteSlice";

// Receiving current Date and Time in a reading format
const now = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayName = daysOfWeek[now.getDay()];
const date = now.getDate();
const monthName = monthsOfYear[now.getMonth()];
const formattedDate = `${dayName} ${date}, ${monthName}`;

let hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

// function for handling pastes
export function handlePaste(
  pasteId,
  title,
  content,
  dispatch,
  setTitle,
  setContent,
  setSearchParams
) {
  // Creating a paste
  const paste = {
    _id: pasteId || Date.now().toString(36),
    title: title,
    content: content,
    createdAt: {
      date: formattedDate,
      time: formattedTime,
    },
  };
  // Now handling the paste according to its existance
  if (pasteId) {
    // update the existed paste
    dispatch(updatePaste(paste));
  } else {
    // create a new paste
    dispatch(createPaste(paste));
  }
  // Afterthat perform some cleaing of title-Field,Content-Area & Parameters in Page-Url
  setTitle('');
  setContent('');
  setSearchParams({});
}
