import { defineStore } from "pinia";

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

    clearItem(itemName) {
      this.$patch((state) => {
        state.items = state.items.filter((item) => item.name !== itemName);
      });
    },
  },
  // getters
  getters: {
    cartCount: (state) => state.items.length,
    isEmpty() {
      return this.cartCount === 0;
    },
    isNotEmpty() {
      return !this.isEmpty;
    },
    // Object.groupBy  > Node 21.0.0 (Released 2023-10-17), or you can use lodash
    grouped: (state) => Object.groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price, 0),
  },
});
