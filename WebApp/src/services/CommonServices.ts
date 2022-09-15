export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("-");
};

export const padTo2Digits = (num: any) => {
  return num.toString().padStart(2, "0");
};
