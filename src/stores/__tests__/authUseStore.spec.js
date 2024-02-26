import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useAuthUserStore } from "/src/stores/AuthUserStore.js";

describe("AuthUser Store", () => {
  let store = null;

  setActivePinia(createPinia());
  store = useAuthUserStore();

  it("setUser sets the user", () => {
    store.setUser("John Doe");
    expect(store.userName).toEqual("John Doe");
  });

  it("clearUser clears the user", () => {
    store.setUser("John Doe");
    expect(store.userName).toEqual("John Doe");
    store.clearUser();
    expect(store.userName).toEqual(null);
  });

  it("getUserName returns the user name", () => {
    store.setUser("John Doe");
    expect(store.getUserName()).toEqual("John Doe");
  });

  it("isLoggedIn returns true if the user is logged in", () => {
    store.setUser("John Doe");
    expect(store.isLoggedIn).toEqual(true);
  });

  it("isLoggedIn returns false if the user is not logged in", () => {
    store.clearUser();
    expect(store.isLoggedIn).toEqual(false);
  });
});
