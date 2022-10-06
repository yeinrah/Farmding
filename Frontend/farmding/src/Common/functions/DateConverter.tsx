export const dateToUnixConverter = (dateStr: string) => {
  // dateStr = '2022-06-22';
  const date = new Date(dateStr);
  // const timestampInMs = date.getTime();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
};

export const getRemainingDays = (endDateStr: string) => {
  const endTime = new Date(endDateStr);
  const today = new Date();
  const remainings = endTime.getTime() - today.getTime();
  const days = Math.floor(remainings / (1000 * 60 * 60 * 24));
  return days;
  // ​​​​const diffDay = Math.floor(diff / (1000*60*60*24));
  // ​​​​const diffHour = Math.floor((diff / (1000*60*60)) % 24);
  // ​​​​const diffMin = Math.floor((diff / (1000*60)) % 60);
  // ​​​​const diffSec = Math.floor(diff / 1000 % 60);
};

// export const getRemainingDays = (now: Date, endDateStr: string) => {
//   // const timestampInMs = date.getTime();
//   const nowUnixTimestamp = Math.floor(now.getTime() / 1000);
//   const unixRemainingDays = dateToUnixConverter(endDateStr) - nowUnixTimestamp;
//   // const remainingDays = unixRemainingDays % (60 * 60 * 24);
//   // console.log(remainingDays);
//   return unixRemainingDays;
// };

// export const unixToDateConverter = (unix_timestamp: number) => {
//   // Create a new JavaScript Date object based on the timestamp
//   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
//   const eachDate = new Date(unix_timestamp * 1000);
//   // Hours part from the timestamp
//   const year = eachDate.getFullYear();
//   // Minutes part from the timestamp
//   const month = "0" + eachDate.getMonth();
//   // Seconds part from the timestamp
//   const date = "0" + eachDate.getDate();

//   // Will display time in 10:30:23 format
//   // const formattedTime = year + "-" + month + "-" + date;
//   const formattedTime = date;

//   console.log(formattedTime);

//   return formattedTime;
// };
