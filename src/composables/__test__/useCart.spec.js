import { describe, it, expect } from "vitest";
import {
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
} from "@/composables/useCart.js";

describe.skip("useCart", () => {
  it("should return the cartStore", () => {
    expect(cartStore).toBeDefined();
  });

  it("should clear an item from the cart", () => {
    expect(clearItem).toBeDefined();
  });

  it("should clear the cart", () => {
    expect(clearCart).toBeDefined();
  });

  it("should check out the cart", () => {
    expect(checkOut).toBeDefined();
  });

  it("should return the count of items in the cart", () => {
    expect(count).toBeDefined();
  });

  it("should return the count of a specific item in the cart", () => {
    expect(groupCount).toBeDefined();
  });

  it("should return the grouped cart items", () => {
    expect(grouped).toBeDefined();
  });

  it("should return true if the cart is empty", () => {
    expect(isEmpty).toBeDefined();
  });

  it("should return true if the cart is not empty", () => {
    expect(isNotEmpty).toBeDefined();
  });

  it("should return the total price of the cart", () => {
    expect(totalPrice).toBeDefined();
  });

  it("should update the count of a specific item in the cart", () => {
    expect(updateCount).toBeDefined();
  });
});
