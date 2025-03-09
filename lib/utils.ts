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

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};
