<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProductCard from "@/components/ProductCard.vue";
import { Heart } from "lucide-vue-next";
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const products = ref([]);
const filteredProducts = ref([]);

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/product/getAllProducts`
    );
    const data = await response.json();
    // console.log("API Response:", data);

    if (Array.isArray(data)) {
      products.value = data; // Update products reactively
      //   console.log("Products updated:", products.value);
      //   console.log("First Product:", products.value[0]); // Debugging
    } else {
      console.error("API did not return an array:", data);
    }
  } catch (error) {
    console.error("Error fetching main products:", error);
  }
};

onMounted(fetchProducts);

watchEffect(() => {
  //   console.log("watchEffect triggered");
  //   console.log(route.params.category);
  if (products.value.length > 0) {
    filteredProducts.value =
      route.params.category === "miere"
        ? products.value.filter((product) => product.isHoney)
        : products.value.filter((product) => !product.isHoney);
    // console.log("Filtered Products:", filteredProducts.value);
  }
});
</script>

<template>
  <HeaderComponent />
  <h3 v-if="route.params.category">Produse cu {{ route.params.category }}</h3>
  <h3 v-else="route.params.category">Alte produse {{ route.params.category }}</h3>
  <div v-if="filteredProducts.length" class="products">
    <ProductCard
      class="product-card"
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <p v-else>Loading products...</p>
</template>

<style scoped>
h3 {
  color: var(--text-color);
  text-align: center;
  font-size: 1.5rem;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding-bottom: 50px;
}

.product-card {
  width: 250px;
}
</style>
