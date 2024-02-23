import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
  // state
  state: () => {
    return {
      userName: "Ian_Irving", // default user
    };
  },
  // actions
  actions: {
    setUser(user) {
      this.userName = user;
    },
    clearUser() {
      this.userName = null;
    },
    getUserName() {
      return this.userName;
    },
  },
  // getters
  getters: {
    isLoggedIn: (state) => state.userName !== null,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
