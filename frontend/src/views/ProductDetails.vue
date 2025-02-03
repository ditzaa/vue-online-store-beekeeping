<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Heart } from "lucide-vue-next";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const product = ref(null);
const fetchProductDetails = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/product/getProductById/${route.params.id}`
    );
    const data = await response.json();
    product.value = data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

onMounted(fetchProductDetails);
</script>

<template>
  <div>
    <HeaderComponent />
    <div v-if="product" class="product-details">
      <ProductCard :key="product.id" :product="product" />
      <h3>Descriere produs</h3>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<style scoped>
h2,
h3 {
  color: var(--text-color);
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.product-image {
  width: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
}

.product-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
}

.add-favorites-button,
.add-cart-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.favorite-product {
  color: var(--heart-hover-color);
}

.favorite-product:hover {
  fill: var(--heart-hover-color);
}

.add-cart-button {
  background-color: var(--secondary-color);
  color: white;
}

.add-cart-button:hover {
  background-color: var(--primary-color);
}
</style>
