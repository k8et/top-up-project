function firstLetterToUppercase(string: string) {
  return !string ? string : string[0].toUpperCase() + string.slice(1);
}

export function displayLongDate(value: string | number | Date) {
  if (typeof value === "number") value = value * 1000;
  const date = new Date(value);
  const month = firstLetterToUppercase(date.toLocaleString("default", { month: "long" }).slice(0, 3));
  const day = date.getDate();
  const fullYear = date.getFullYear();
  return `${month} ${day}, ${fullYear}`;
}
