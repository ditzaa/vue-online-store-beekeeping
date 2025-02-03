<script setup>
import { ref, onMounted } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";

const orders = ref([]);
const filteredOrders = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const fetchOrdersFromBackend = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/order/getAllOrders`
    );
    if (!response.ok) throw new Error("Eroare la preluarea comenzilor");

    const data = await response.json();
    orders.value = data;
    filteredOrders.value = data;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOrdersFromBackend);

const filterByStatus = (status) => {
  if (status === "Toate") {
    filteredOrders.value = [...orders.value];
  } else {
    filteredOrders.value = orders.value.filter((order) => order.status === status);
  }
};
</script>

<template>
  <AdminHeader class="admin-header" />
  <div class="orders-container">
    <section class="orders-view">
      <h1>Comenzi</h1>

      <div v-if="loading">Se încarcă...</div>
      <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-else>
        <div class="filter-buttons">
          <button @click="filterByStatus('Toate')">Toate</button>
          <button @click="filterByStatus('In asteptare')">În așteptare</button>
          <button @click="filterByStatus('Expediata')">Expediate</button>
          <button @click="filterByStatus('Livrata')">Livrate</button>
        </div>

        <div class="order-list">
          <div class="order-item" v-for="order in filteredOrders" :key="order.id">
            <div><b>ID comandă:</b> {{ order.id }}</div>
            <div><b>Client:</b> {{ order.clientName }}</div>
            <div><b>Email: </b>{{ order.email }}</div>
            <div><b>Telefon:</b> {{ order.phone }}</div>
            <div><b>Pret total:</b> {{ order.totalPrice }} Lei</div>
            <div><b>Status:</b> {{ order.status }}</div>
            <router-link
              :to="{ name: 'OrderDetails', params: { id: order.id } }"
              class="view-button"
            >
              Vizualizare
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.orders-container {
  background-color: var(--background-color);
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.orders-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
}

h1 {
  text-align: center;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-buttons button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
}

.filter-buttons button:hover {
  background-color: var(--secondary-color);
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.order-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  background-color: var(--card-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: auto;
  width: 300px;
  height: 250px;
}

.order-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.order-item div {
  font-size: 1rem;
  color: var(--text-color);
}

.view-button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
}

.view-button:hover {
  background-color: var(--secondary-color);
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }

  .filter-buttons button {
    width: 100%;
    max-width: 200px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .order-item {
    padding: 1.25rem;
  }
}
</style>
