<script setup>
// import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/ProductCard.vue";

const productPlaceholder = {
  id: 1,
  name: "Miere polifloră premium",
  image: "https://source.unsplash.com/random/?honey,bees",
  price: 25.99,
};
</script>

<template>
  <section>
    <ProductCard :product="productPlaceholder" />
    <ProductCard :product="productPlaceholder" />
    <ProductCard :product="productPlaceholder" />
    <ProductCard :product="productPlaceholder" />
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
