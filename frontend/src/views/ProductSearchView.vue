<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const searchQuery = ref("");
const searchResults = ref([]);

const fetchSearchResult = async (query) => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/product/search?query=${query}`
    );
    const data = await response.json();
    searchResults.value = data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

watch(
  () => route.query.query,
  (newQuery) => {
    searchQuery.value = newQuery;
    fetchSearchResult(newQuery);
  },
  { immediate: true }
);
</script>

<template>
  <HeaderComponent />
  <h4>Rezultatele căutării pentru: "{{ searchQuery }}"</h4>
  <section class="search-result-container" v-if="searchResults.length">
    <ProductCard v-for="product in searchResults" :key="product.id" :product="product" />
  </section>
  <p v-else>Nu s-au găsit rezultate pentru "{{ searchQuery }}".</p>
</template>

<style scoped>
.search-result-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

h4 {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #2c3e50;
}
</style>
