import { computed } from "vue";
import { useCartStore } from "@/stores/CartStore";

export default function useCart() {
  const cartStore = useCartStore();

  // totalPrice hides the complexity of the calculation from the templat
  const totalPrice = computed(() => cartStore.displayTotalPrice);
  const count = computed(() => cartStore.count);

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
