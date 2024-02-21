import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useCartStore } from "/src/stores/CartStore.js";

describe("CartStore", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCartStore();
  });

  it("the store is initialized with an empty cart", () => {
    expect(store.items).toEqual([]);
  });
  it("addItem adds an item to the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.items).toEqual([{ name: "item1", price: 11 }]);
  });
  it("setItemCount sets the count of an item in the cart", () => {});
  it("clearItem removes an item from the cart", () => {});
  it("checkOut alerts the user with the total price", () => {});
  it("clear empties the cart", () => {});
  it("count returns the number of items in the cart", () => {});
  it("isEmpty returns true if the cart is empty", () => {});
  it("isNotEmpty returns true if the cart is not empty", () => {});
  it("grouped returns the items grouped by category", () => {});

  // getters
  it("groupCount returns the number of items in each category", () => {});
  it("groupTotalPrice returns the total price of each category", () => {});
  it("totalPrice returns the total price of the cart", () => {});
});
