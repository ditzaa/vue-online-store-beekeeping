<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";

const mainProducts = ref([]);

const fetchMainProducts = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/product/getMainProducts`
    );
    const data = await response.json();

    if (data.mainProductsDetails) {
      mainProducts.value = data.mainProductsDetails;
    }

    console.log("Fetched products:", mainProducts.value);
  } catch (error) {
    console.error("Error fetching main products:", error);
  }
};

onMounted(fetchMainProducts);
</script>

<template>
  <section>
    <ProductCard v-for="product in mainProducts" :key="product.id" :product="product" />
  </section>
</template>

<style>
section {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-bottom: 30px;
}

@media (min-width: 768px) and (max-width: 1200px) {
  section {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  section {
    flex-direction: column;
    align-items: center;
  }
}
</style>
