import { defineStore, acceptHMRUpdate } from "pinia";
import useDisplayCurrency from "../composables/useDisplayCurrency.js";
import { useAuthUserStore } from "../stores/AuthUserStore.js";
export const useCartStore = defineStore("CartStore", {
  // state
  state: () => {
    return {
      items: [],
    };
  },
  // actions
  actions: {
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

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItem(count, { ...item });
    },

    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },

    checkOut() {
      const authStore = useAuthUserStore();
      const userName = authStore.userName;
      let count = this.count;
      let msg = `${userName} just bought ${count} ${
        count > 1 ? "items" : "item"
      } for at total of ${this.totalPrice}`;
      alert(msg);
    },
  },
  // getters
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    isNotEmpty: (state) => !state.isEmpty,
    // Object.groupBy  > Node 21.0.0 (Released 2023-10-17), or you can use lodash
    grouped: (state) => {
      const grouped = Object.groupBy(state.items, (item) => item.name);
      const sortedKeys = Object.keys(grouped).sort(); // sort by name
      let inOrder = {};
      sortedKeys.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price, 0),
    displayTotalPrice: (state) => useDisplayCurrency(state.totalPrice),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
