import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useCartStore } from "/src/stores/CartStore.js";
import { useAuthUserStore } from "/src/stores/AuthUserStore.js";

vi.mock("/src/stores/AuthUserStore.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

describe("CartStore", () => {
  let store = null;
  let authStore = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCartStore();
    authStore = useAuthUserStore();

    // mock the authStore.getUserName method
    authStore.getUserName = vi.fn(() => {
      return "John Doe fake Name";
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
  it("checkOutMessage returns a message with the number of items and the total price", () => {
    const getAuthStoreUserName = authStore.getUserName();
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.checkOutMessage()).toEqual(
      `${getAuthStoreUserName} just bought 1 item for at total of 10`
    );
  });
  it.skip("checkOut alerts the user with the total price", () => {
    // TODO: figure out how to mock userName = authStore.userName;
    // TODO: figure out how to mock alert, maybe with --enviroment jsdom ?
    const getAuthStoreUserName = authStore.userName;
    store.addItem(1, { name: "item1", price: 10 });
    store.checkOut();
    expect(window.alert).toHaveBeenCalledWith(
      `${getAuthStoreUserName} just bought 1 item for at total of 10`
    );
  });
  it("clear empties the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.clear();
    expect(store.items).toEqual([]);
  });
  it("count returns the number of items in the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.count).toEqual(1);
  });
  it("isEmpty returns true if the cart is empty", () => {
    expect(store.isEmpty).toEqual(true);
  });
  it("isNotEmpty returns true if the cart is not empty", () => {
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.isNotEmpty).toEqual(true);
  });
  it("grouped returns the items grouped by category", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.addItem(1, { name: "item2", price: 20 });
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.grouped).toEqual({
      item1: [
        { name: "item1", price: 10 },
        { name: "item1", price: 10 },
      ],
      item2: [{ name: "item2", price: 20 }],
    });
  });

  // getters
  it("groupCount returns the number of items in each category", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.addItem(1, { name: "item2", price: 20 });
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.groupCount("item1")).toEqual(2);
    expect(store.groupCount("item2")).toEqual(1);
  });

  it("totalPrice returns the total price of the cart", () => {
    store.addItem(1, { name: "item1", price: 10 });
    store.addItem(1, { name: "item2", price: 20 });
    store.addItem(1, { name: "item1", price: 10 });
    expect(store.totalPrice).toEqual(40);
  });
});
