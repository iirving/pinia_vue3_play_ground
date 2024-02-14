import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
  // state
  state: () => {
    return {
      userName: "Ian_Irving",
    };
  },
  // actions
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
  // getters
  getters: {
    isLoggedIn: (state) => state.userName !== null,
  },
});
