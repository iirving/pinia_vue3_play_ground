import { defineStore } from "pinia";
// import products from "@/data/products.json";

export const useProductStore = defineStore("ProductStore", {
  //state
  state: () => {
    return {
      // products: products,
      products: [],
    };
  },
  //action
  actions: {
    async fetchProducts() {
      setTimeout(async () => {
        // Simulate a network request by delaying the response for 1 second
        this.products = (await import("@/data/products.json")).default;
      }, 1000);
    },
  },
  //getters
});
