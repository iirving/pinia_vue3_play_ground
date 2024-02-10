export default function useDisplayCurrency(amount) {
  const currencySymbol = "$";

  console.log(amount);
  return `${currencySymbol}${amount}`;
}
