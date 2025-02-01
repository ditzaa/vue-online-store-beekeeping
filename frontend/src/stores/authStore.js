import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async initializeAuth() {
      if (!this.token) return;
      console.log("Initializing auth with token:", this.token);
    },
    async validateToken() {
      if (!this.token) return;

      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_DOMAIN_NAME}:${
            import.meta.env.VITE_PORT_BACK_END
          }/api/validate`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );

        const data = await response.json();
        console.log("Validate response:", data);
        if (!response.ok) throw new Error(data.message);

        this.user = data.user;
        console.log("User after validation:", this.user);
      } catch (error) {
        console.error("Token invalid:", error);
        this.logout();
      }
    },
    async login(email, password) {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_DOMAIN_NAME}:${
            import.meta.env.VITE_PORT_BACK_END
          }/api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        console.log("Response status:", response.status);
        if (!response.ok) {
          const text = await response.text();
          s;
          console.error("Server error:", text);
          throw new Error("Login failed: " + text);
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        console.log("Server response:", data);

        this.token = data.token;
        console.log(data.user);
        this.user = JSON.parse(JSON.stringify(data.user));
        console.log("User after validation:", this.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", this.user.name);
      } catch (error) {
        console.error("Eroare la autentificare:", error.message);
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});
