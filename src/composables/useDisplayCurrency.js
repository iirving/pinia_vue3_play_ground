export default function useDisplayCurrency(amount) {
  const currencySymbol = "$";
  return `${currencySymbol}${amount}`;
}
