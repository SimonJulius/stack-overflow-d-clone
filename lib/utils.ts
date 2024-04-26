import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (date: Date): string => {
  const now = dayjs();
  const targetDate = dayjs(date);

  const diffHours = now.diff(targetDate, "hour");

  if (diffHours < 24) {
    if (diffHours < 1) {
      const diffMinutes = now.diff(targetDate, "minute");
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  if (diffHours < 48) {
    return "yesterday";
  }

  if (diffHours < 72) {
    return "2 days ago";
  }

  if (now.diff(targetDate, "year") === 0) {
    return targetDate.format("MMM DD [at] HH:mm");
  }

  return targetDate.format("MMM DD, YYYY [at] HH:mm");
};

export const formatNumber = (number: number): string => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else {
    return (number / 1000000000).toFixed(1) + "B";
  }
};
