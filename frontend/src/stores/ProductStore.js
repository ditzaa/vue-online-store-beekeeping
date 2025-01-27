import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    favorites: [],
    cart: [],
  }),
  actions: {
    addToFavorites(product) {
      if (!this.favorites.some((p) => p.id === product.id)) {
        this.favorites.push(product);
      }
    },
    addToCart(product) {
      if (!this.cart.some((p) => p.id === product.id)) {
        this.cart.push(product);
      }
    },
  },
});
