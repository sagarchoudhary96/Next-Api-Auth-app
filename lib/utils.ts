import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const searchInString = (searchVal: string, value: string) =>
  value.toLowerCase().includes(searchVal.toLowerCase());

export const searchValueInRow = <T extends object>(
  searchVal: string,
  row: T
): boolean => {
  return Object.values(row).some((value) =>
    typeof value === "object"
      ? searchValueInRow(searchVal, value)
      : searchInString(searchVal, value?.toString())
  );
};
