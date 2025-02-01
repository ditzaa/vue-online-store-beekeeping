<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProductCard from "@/components/ProductCard.vue";

const authStore = useAuthStore();
const router = useRouter();
const favoriteProducts = ref([]);

const fetchFavoriteProducts = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/user/favorites`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    const data = await response.json();
    favoriteProducts.value = data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchFavoriteProducts();
  }
});
</script>

<template>
  <HeaderComponent />
  <div v-if="authStore.isAuthenticated">
    <h2>Produsele tale favorite</h2>
    <section v-if="favoriteProducts.length">
      <ProductCard v-for="product in favoriteProducts" :key="product.id" :product="product" />
    </section>
    <p v-else>Nu ai produse favorite încă.</p>
  </div>
  <div v-else>
    <h2>Trebuie să fii logat pentru a vedea produsele tale favorite.</h2>
    <button @click="router.push('/login')">Loghează-te</button>
    <button @click="router.push('/register')">Înregistrează-te</button>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

h2 {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #2c3e50;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: white;
}

button:hover {
  background-color: var(--primary-color);
}
</style>
