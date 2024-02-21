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
    expect(store.items).toEqual([{ name: "item1", price: 10 }]);
  });
  it("setItemCount sets the count of an item in the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.setItemCount({ name: "item1", price: 10 }, 2);
    expect(store.items).toEqual([
      { name: "item1", price: 10 },
      { name: "item1", price: 10 },
    ]);
  });
  it("clearItem removes an item from the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.clearItem("item1");
    expect(store.items).toEqual([]);
  });
  it.skip("checkOut alerts the user with the total price", () => {
    // TODO: figure out how to mock userName = authStore.userName;
    // TODO: figure out how to mock alert, maybe with --enviroment jsdom ?
    store.addItem(1, { name: "item1", price: 10 });
    store.checkOut();
    expect(window.alert).toHaveBeenCalledWith(
      "just bought 1 item for at total of 10"
    );
  });
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
