import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

export const getMonthLabel = (startDate: Date): string =>
  startDate.toLocaleString("default", { month: "long" });

export const getWeekNumber = (date: Date): number => dayjs(date).week();

export const getWeekLabel = (startDate: Date, endDate: Date): string => {
  const weekNum = getWeekNumber(startDate);
  const year = dayjs(startDate).year();
  const diff = dayjs(endDate).diff(dayjs(startDate), "day");
  return `W${weekNum.toString().padStart(2, "0")}-${year} No of Days: ${diff}`;
};
