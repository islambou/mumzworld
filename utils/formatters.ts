import numeral from "numeral";

export function fCurrency(number: number) {
  const format = numeral(number).format(`00,00`);

  return result(format, ".00");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
