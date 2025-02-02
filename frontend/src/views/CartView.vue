<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import HeaderComponent from "@/components/HeaderComponent.vue";

const authStore = useAuthStore();
const cartRef = ref([]);
const nbOfDifferentProducts = ref(0);

const fetchCart = async () => {
  if (authStore.isAuthenticated) {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_DOMAIN_NAME}:${
          import.meta.env.VITE_PORT_BACK_END
        }/api/user/getCartProducts`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      const { cart, cartQuantity } = data;

      const productRequests = cart.map((id) =>
        fetch(
          `http://${import.meta.env.VITE_DOMAIN_NAME}:${
            import.meta.env.VITE_PORT_BACK_END
          }/api/product/getProductById/${id}`
        ).then((res) => res.json())
      );

      const products = await Promise.all(productRequests);

      cartRef.value = products.map((product, index) => ({
        ...product,
        quantity: cartQuantity[index],
      }));

      nbOfDifferentProducts.value = cartRef.value.length;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  } else {
    cartRef.value = JSON.parse(localStorage.getItem("cart")) || [];
    nbOfDifferentProducts.value = cartRef.value.length;
  }
};

const removeFromCart = async (productId) => {
  if (authStore.isAuthenticated) {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_DOMAIN_NAME}:${
          import.meta.env.VITE_PORT_BACK_END
        }/api/user/removeFromCart`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product");
      }

      cartRef.value = cartRef.value.filter((product) => product.id !== productId);
      nbOfDifferentProducts.value = cartRef.value.length;
    } catch (error) {
      console.error("Error removing product:", error);
    }
  } else {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    cartRef.value = cart;
    nbOfDifferentProducts.value = cart.length;
  }
};

const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity <= 0) return; // Evităm cantități invalide

  if (authStore.isAuthenticated) {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_DOMAIN_NAME}:${
          import.meta.env.VITE_PORT_BACK_END
        }/api/user/addToCart`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const data = await response.json();
      cartRef.value = cartRef.value.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  } else {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    cartRef.value = cart;
  }
};

const totalPrice = computed(() =>
  cartRef.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

onMounted(fetchCart);
</script>

<template>
  <HeaderComponent />
  <div class="cart-page">
    <h1>Coșul de cumpărături</h1>
    <div v-if="cartRef.length">
      <div v-for="product in cartRef" :key="product.id" class="cart-item">
        <img :src="product.image" alt="Product Image" class="cart-image" />
        <div class="cart-info">
          <h3>{{ product.name }}</h3>
          <p>Preț unitar: {{ product.price }} Lei</p>
          <!-- <p>Cantitate: {{ product.quantity }}</p> -->
          <div class="quantity-container">
            <button class="quantity-btn" @click="updateQuantity(product.id, product.quantity - 1)">
              ➖
            </button>
            <input
              type="number"
              class="quantity-input"
              :value="product.quantity"
              @change="(event) => updateQuantity(product.id, parseInt(event.target.value))"
            />
            <button class="quantity-btn" @click="updateQuantity(product.id, product.quantity + 1)">
              ➕
            </button>
          </div>
          <p class="total-product">Total produs: {{ product.price * product.quantity }} Lei</p>
          <button @click="removeFromCart(product.id)">🗑️ Elimină</button>
        </div>
      </div>
      <h2>Total: {{ totalPrice }} Lei</h2>
      <button class="checkout-btn" @click="goToCheckout">Plasează comanda</button>
    </div>
    <p v-else>Coșul tău este gol.</p>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 20px;
  text-align: center;
  background-color: var(--background-color);
  min-height: 100vh;
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--product-card-bg);
  border: 2px solid var(--accent-color);
  border-radius: 10px;
  padding: 15px;
  margin: 10px auto;
  max-width: 600px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.cart-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px;
}

.cart-info {
  flex: 1;
  text-align: left;
}

.cart-info h3 {
  color: var(--text-color);
}

.cart-info p {
  margin: 5px 0;
}

.cart-info .total-product {
  font-weight: bold;
  color: var(--secondary-color);
}

button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: var(--accent-color);
}

.checkout-btn {
  margin-top: 20px;
  background-color: var(--primary-color);
  font-size: 1.2rem;
  padding: 12px 20px;
  border-radius: 10px;
}

.checkout-btn:hover {
  background-color: var(--secondary-color);
}

.quantity-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* quantity */
.quantity-input {
  width: 50px;
  text-align: center;
  border: 2px solid var(--secondary-color);
  border-radius: 5px;
  padding: 5px;
}

.quantity-btn {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

.quantity-btn:hover {
  background-color: var(--accent-color);
}

/* RESPONSIVE DESIGN */
@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .cart-image {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

  .checkout-btn {
    width: 100%;
  }

  .cart-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
