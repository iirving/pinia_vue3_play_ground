import { defineStore, acceptHMRUpdate } from "pinia";
import useDisplayCurrency from "../composables/useDisplayCurrency.js";
import { useAuthUserStore } from "../stores/AuthUserStore.js";
import { useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
  // state
  state: () => {
    return {
      items: useLocalStorage("cartStore:items", []), // persist cart items in local storage
    };
  },
  // actions
  actions: {
    // addItem function to add item to cart
    // addItem(1, {name: "item1", price: 10}) will add 1 item to the cart
    addItem(count, item) {
      count = parseInt(count);
      if (isNaN(count) || count <= 0) return;
      this.$patch((state) => {
        for (let index = 0; index < count; index++) {
          state.items.push({ ...item }); // clone the item so its reference is not shared
        }
      });
    },

    // alternative way to add item to cart without patch
    // count = parseInt(count);
    // for (let index = 0; index < count; index++) {
    //   this.items.push({...item});
    // }

    // setItemCount function to add multiple items at once
    // setItemCount({name: "item1", price: 10}, 2)
    // will add 2 items to the cart
    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItem(count, { ...item });
    },

    // clearItem function to remove item from the cart
    // clearItem("item1") will remove all items with name "item1"
    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },

    // checkOutMessage function to return a message number of items and total price
    checkOutMessage() {
      const authStore = useAuthUserStore();
      let userName = authStore.userName;
      let count = this.count;
      let msg = `${userName} just bought ${count} ${
        count > 1 ? "items" : "item"
      } for at total of ${this.totalPrice}`;
      return msg;
    },
    // checkOut function to display number of items and total price
    checkOut() {
      let msg = this.checkOutMessage();
      alert(msg);
    },

    // clear function to empty the cart
    clear() {
      this.items = [];
    },
  },
  // getters
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    isNotEmpty: (state) => !state.isEmpty,
    // Object.groupBy  > Node 21.0.0 (Released 2023-10-17), or you can use lodash
    // grouped returns the all the items in cart grouped by name
    grouped: (state) => {
      const grouped = Object.groupBy(state.items, (item) => item.name);
      const sortedKeys = Object.keys(grouped).sort(); // sort by name
      let inOrder = {};
      sortedKeys.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },
    // groupCount returns the number of items for a given name
    groupCount: (state) => (name) => state.grouped[name].length,
    // groupTotalPrice returns the total price for all items in the cart
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price, 0),
    // displayTotalPrice returns the formatted total price
    displayTotalPrice: (state) => useDisplayCurrency(state.totalPrice),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
