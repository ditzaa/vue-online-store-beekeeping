<script setup>
import { Heart } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { ref, computed, watch, onMounted } from "vue";
// import { useProductStore } from "@/stores/productStore";

// const productStore = useProductStore();
const router = useRouter();
const authStore = useAuthStore();
const isFavorite = ref(false);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const goToProductDetails = () => {
  router.push(`/product/${props.product.id}`);
};

const fetchFavoriteStatus = async () => {
  if (!authStore.isAuthenticated) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/user/favorites/${props.product.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch favorite status");

    const data = await response.json();
    isFavorite.value = data.isFavorite;
  } catch (error) {
    console.error("Error fetching favorite status:", error);
  }
};

onMounted(fetchFavoriteStatus);

const toggleFavorite = async () => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/user/toggleFavorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: props.product.id }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update favorites");
    }

    const data = await response.json();
    authStore.setUserFavorites(data.favoriteProducts); // Actualizează Pinia store
    isFavorite.value = data.isFavorite;
    isFavorite.value = data.favoriteProducts.includes(props.product.id);
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

// const addToCart = () => {
//   productStore.addToCart(props.product);
// };
</script>

<template>
  <div class="product-card">
    <img
      :src="product.image"
      :alt="product.name"
      class="product-image"
      @click="goToProductDetails"
    />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ product.price }} Lei</p>
    <div class="product-buttons">
      <Heart
        @click.stop="toggleFavorite"
        class="favorite-button"
        :fill="isFavorite ? 'red' : 'none'"
      />
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
