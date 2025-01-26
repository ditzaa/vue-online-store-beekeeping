<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import HomeProducts from "@/components/HomeProducts.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    HeroComponent,
    HomeProducts,
  },
};
</script>

<template>
  <HeaderComponent />
  <HeroComponent />
  <HomeProducts />
</template>
