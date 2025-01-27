<script setup>
import { Heart } from "lucide-vue-next";
import { useProductStore } from "@/stores/productStore";
import HeaderComponent from "@/components/HeaderComponent.vue";

const productStore = useProductStore();

const productDetails = {
  id: 99,
  //   id: route.params.id,
  name: "Miere polifloră premium",
  image: "https://source.unsplash.com/random/400x400/?honey,bees",
  price: 25.99,
  description:
    "Această miere polifloră premium este obținută din florile sălbatice din inima naturii. Perfectă pentru sănătatea ta, cu arome delicate și un gust unic.",
};

const addToFavorites = () => {
  productStore.addToFavorites(productDetails);
};

const addToCart = () => {
  productStore.addToCart(productDetails);
};
</script>

<template>
  <HeaderComponent />
  <div class="detailed-product-details">
    <div class="product-details-header">
      <!-- <img :src="productDetails.image" :alt="productDetails.name" class="product-image" /> -->
      <img src="../assets/borcan-miere-poliflora.jpg" alt="product.name" class="product-image" />
      <div class="product-info">
        <h1 class="product-name">{{ productDetails.name }}</h1>
        <p class="product-price">{{ productDetails.price }} Lei</p>
        <div class="product-buttons">
          <Heart @click="addToFavorites" class="favorite-button" />
          <button @click="addToCart" class="add-cart-button">🛒 Adaugă în coș</button>
        </div>
      </div>
    </div>
    <div class="product-description">
      <h2>Descriere produs</h2>
      <p>{{ productDetails.description }}</p>
    </div>
  </div>
</template>

<style>
.detailed-product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.product-details-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.product-details-header > * {
  width: 50%;
}

.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  border: 2px solid var(--secondary-color);
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.product-name {
  font-size: 2rem;
  color: var(--text-color);
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
}

.product-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.favorite-button {
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.favorite-button:hover {
  color: darkred;
}

.add-cart-button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-cart-button:hover {
  background-color: var(--primary-color);
}

.product-description {
  margin-top: 2rem;
  max-width: 800px;
  text-align: center;
}

.product-description h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.product-description p {
  font-size: 1.2rem;
  color: var(--text-color);
  line-height: 1.6;
}

@media (min-width: 768px) and (max-width: 1200px) {
  .product-details-header {
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }

  .product-image {
    max-width: 300px;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 1.7rem;
  }
}

@media (max-width: 768px) {
  .product-details-header {
    /* display: flex; */
    flex-direction: column;
  }
  .detailed-product-details {
    padding: 1rem;
  }

  .product-image {
    max-width: 80%;
  }

  .product-name {
    font-size: 1.2rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .add-cart-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
