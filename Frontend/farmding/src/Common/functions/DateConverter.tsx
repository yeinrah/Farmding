export const dateConverter = (dateStr: string) => {
  // dateStr = '2022-06-22';
  const date = new Date(dateStr);
  console.log(date); // Wed Jun 22 2022
  // const timestampInMs = date.getTime();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  console.log(unixTimestamp)
  return unixTimestamp
};



