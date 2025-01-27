<script setup>
import { ref } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";

// mock-uri
const orders = ref([
  { id: 1, total: 250.0, status: "În așteptare" },
  { id: 2, total: 100.0, status: "Expediată" },
  { id: 3, total: 300.0, status: "Livrată" },
  { id: 4, total: 300.0, status: "Expediată" },
  { id: 5, total: 300.0, status: "Livrată" },
  { id: 6, total: 300.0, status: "Livrată" },
]);

const filteredOrders = ref([...orders.value]);
const filterByStatus = (status) => {
  if (status == "Toate") {
    filteredOrders.value = [...orders.value];
  } else {
    filteredOrders.value = orders.value.filter((order) => order.status === status);
  }
};

// TODO: implement back-end route
// const fetchOrdersFromBackend = async () => {
//   try {
//     const response = await fetch("/api/orders");
//     const data = await response.json();
//     orders.value = data;
//     filteredOrders.value = data;
//   } catch (error) {
//     console.error("Eroare la preluarea comenzilor:", error);
//   }
// };
</script>

<template>
  <AdminHeader class="admin-header" />
  <div class="orders-container">
    <section class="orders-view">
      <h1>Comenzi</h1>

      <div class="filter-buttons">
        <button @click="filterByStatus('Toate')">Toate</button>
        <button @click="filterByStatus('În așteptare')">În așteptare</button>
        <button @click="filterByStatus('Expediată')">Expediate</button>
        <button @click="filterByStatus('Livrată')">Livrate</button>
      </div>

      <div class="order-list">
        <div class="order-item" v-for="order in filteredOrders" :key="order.id">
          <div>ID comandă: {{ order.id }}</div>
          <div>Preț total: {{ order.total }} Lei</div>
          <div>Status: {{ order.status }}</div>
          <button class="view-button">Vizualizare</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.orders-container {
  background-color: var(--background-color);
  height: 46rem;
}
.orders-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
}

.filter-buttons {
  /* justify-self: flex-start; */
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
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
  max-width: 800px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--secondary-color);
  border-radius: 8px;
  background-color: var(--card-bg);
}

.view-button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.view-button:hover {
  background-color: var(--secondary-color);
}

@media (min-width: 768px) and (max-width: 1200px) {
  .orders-view {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .filter-buttons {
    /* flex-wrap: wrap; */
    flex-direction: column;
  }

  .filter-buttons > button {
    width: 180px;
    height: 50px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
