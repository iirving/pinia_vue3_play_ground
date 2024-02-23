export default function useDisplayCurrency(amount) {
  const getCurrencySymbol = () => {
    // This is a mock function that returns the currency symbol
    // based on the user's locale, or the user's preference,
    // else fallbacks to the default currency symbo
    const defaultCurrencySymbol = "$";
    return defaultCurrencySymbol;
  };

  return `${getCurrencySymbol()}${amount}`;
}
