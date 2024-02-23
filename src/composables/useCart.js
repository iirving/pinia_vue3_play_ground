import { computed } from "vue";
import { useCartStore } from "@/stores/CartStore";
import useDisplayCurrency from "../composables/useDisplayCurrency.js";

export default function useCart() {
  const cartStore = useCartStore();

  const count = computed(() => cartStore.count);

  // totalPrice hides the complexity of the calculation from the template and
  // returns the total price in the display currency format with the currency symbol
  const totalPrice = computed(() => useDisplayCurrency(cartStore.totalPrice));

  // methods

  const clearItem = (name) => {
    cartStore.clearItem(name);
  };

  const clearCart = () => {
    console.log("clearCart");
    cartStore.clear();
  };

  const checkOut = () => {
    cartStore.checkOut();
  };

  const groupCount = (name) => {
    return cartStore.groupCount(name);
  };

  const grouped = () => {
    return cartStore.grouped;
  };

  const isEmpty = () => {
    return cartStore.isEmpty;
  };

  const isNotEmpty = () => {
    return cartStore.isNotEmpty;
  };

  const updateCount = (name, count) => {
    cartStore.setItemCount(name, count);
  };

  return {
    cartStore,
    clearItem,
    clearCart,
    checkOut,
    count,
    groupCount,
    grouped,
    isEmpty,
    isNotEmpty,
    totalPrice,
    updateCount,
  };
}
