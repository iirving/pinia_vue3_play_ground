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
  },
  // getters
  getters: {
    cartCount: (state) => state.items.length,
    isEmpty() {
      return this.cartCount === 0;
    },
  },
});
