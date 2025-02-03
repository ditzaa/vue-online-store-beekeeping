<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";

const authStore = useAuthStore();
const router = useRouter();

const deliveryMethod = ref("curier");
const totalPriceFront = ref(JSON.parse(localStorage.getItem("totalPrice")));
console.log();

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const orderData = ref({
  clientName: "",
  email: "",
  phone: "",
  county: "",
  locality: "",
  address: "",
  cart: cart.value.map((item) => item.id),
  cartQuantity: cart.value.map((item) => item.quantity),
  totalPrice: computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)),
  deliveryMethod: deliveryMethod.value,
});

watch(
  cart,
  (newCart) => {
    orderData.value.cart = newCart.map((item) => item.id);
    orderData.value.cartQuantity = newCart.map((item) => item.quantity);
    orderData.value.totalPrice = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  { deep: true }
);

watch(deliveryMethod, (newMethod) => {
  orderData.value.deliveryMethod = newMethod;
});

const placeOrder = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/order/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData.value),
      }
    );

    if (!response.ok) {
      throw new Error("Eroare la plasarea comenzii");
    }

    localStorage.removeItem("cart");
    cart.value = [];
    router.push("/");
  } catch (error) {
    console.error("Eroare la plasarea comenzii:", error);
  }
};
</script>

<template>
  <HeaderComponent />
  <div class="checkout-container">
    <h2>Finalizare comandă</h2>

    <label for="deliveryMethod">Metoda de livrare:</label>
    <select v-model="deliveryMethod">
      <option value="curier">Livrare prin curier</option>
      <option value="ridicare">Ridicare personală</option>
    </select>

    <div class="form-group">
      <label>Nume:</label>
      <input type="text" v-model="orderData.clientName" required />
    </div>

    <div class="form-group">
      <label>Email:</label>
      <input type="email" v-model="orderData.email" required />
    </div>

    <div class="form-group">
      <label>Telefon:</label>
      <input type="text" v-model="orderData.phone" required />
    </div>

    <div class="form-group">
      <label>Județ:</label>
      <input type="text" v-model="orderData.county" required />
    </div>

    <div class="form-group">
      <label>Localitate:</label>
      <input type="text" v-model="orderData.locality" required />
    </div>

    <div class="form-group" v-if="deliveryMethod === 'curier'">
      <label>Adresă:</label>
      <input type="text" v-model="orderData.address" required />
    </div>

    <div class="last-row-form">
      <h3>Pret total: {{ totalPriceFront }}</h3>
      <button @click="placeOrder">Plasează comanda</button>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid var(--accent-color);
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: var(--accent-color);
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  color: var(--text-color);
}

button {
  width: 30%;
  align-self: center;
  padding: 10px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.last-row-form {
  display: flex;
  justify-content: center;
  gap: 60px;
}

button:hover {
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 15px;
  }
  button {
    padding: 6px;
    width: 170px;
    height: 50px;
    border-radius: 10px;
  }
}
</style>
