<script setup>
import { Heart } from "lucide-vue-next";
import { useRouter } from "vue-router";

// import { useProductStore } from "@/stores/productStore";
// const productStore = useProductStore();
const router = useRouter();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const goToProductDetails = () => {
  router.push(`/product/${props.product.id}`);
};

const addToFavorites = () => {
  productStore.addToFavorites(props.product);
};

const addToCart = () => {
  productStore.addToCart(props.product);
};
</script>

<template>
  <div class="product-card" @click="goToProductDetails">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <!-- <img src="../assets/borcan-miere-poliflora.jpg" alt="product.name" class="product-image" /> -->
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ product.price }} Lei</p>
    <div class="product-buttons">
      <Heart @click.stop="addToFavorites" class="favorite-button" />
      <button @click.stop="addToCart" class="add-cart-button">🛒 Adaugă în coș</button>
    </div>
  </div>
</template>

<style>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--product-card-bg);
  border: 2px solid var(--secondary-color);
  border-radius: 20px;
  padding: 16px;
  cursor: pointer;
  /* max-width: 280px; */
  width: 250px;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  max-width: 160px;
  height: auto;
  border-radius: 8px;
}

.product-name {
  font-size: 1.25rem;
  color: var(--text-color);
  margin: 8px 0;
  text-align: center;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 8px 0;
}

.product-buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-top: 10px;
}

.favorite-button,
.add-cart-button {
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.favorite-button {
  color: red;
  background-color: none;
}

.favorite-button:hover {
  fill: red;
}

.add-cart-button {
  background-color: var(--secondary-color);
  border-radius: 10px;
}

.add-cart-button:hover {
  background-color: var(--primary-color);
}

/* Tableta */
@media (min-width: 768px) and (max-width: 1200px) {
  .product-card {
    padding: 12px;
  }

  .product-name {
    font-size: 1rem;
  }

  .product-price {
    font-size: 0.9rem;
  }

  .favorite-button,
  .add-cart-button {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 768px) {
  .product-card {
    padding: 10px;
    width: 55%;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 0.8rem;
  }

  .favorite-button,
  .cart-button {
    font-size: 0.8rem;
    padding: 4px 10px;
  }
}
</style>
