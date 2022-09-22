export const cutLongTitle = (title: string, maxNum: number) => {
  if (title.length > maxNum) return title.slice(0, maxNum) + "...";
  return title;
};