export function currencyFormat(number) {
  if(typeof number !== Number) number = parseFloat(number)
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
