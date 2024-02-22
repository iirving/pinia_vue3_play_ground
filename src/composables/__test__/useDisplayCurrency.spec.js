import { describe, it, expect } from "vitest";
import displayCurrency from "../useDisplayCurrency";

describe("useDisplayCurrency", () => {
  it("should return the display currency with currency symbol", () => {
    const amount = 42;
    const result = displayCurrency(amount);
    expect(result).toBe("$42");
  });

  it("should return the display currency ", () => {
    const amount = 42.23;
    const result = displayCurrency(amount);
    expect(result).toBe("$42.23");
  });
});
