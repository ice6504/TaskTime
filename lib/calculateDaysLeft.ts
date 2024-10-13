export const calculateDaysLeft = (endDate: string) => {
  const end = new Date(endDate);
  const today = new Date();

  const differenceInTime = end.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};
