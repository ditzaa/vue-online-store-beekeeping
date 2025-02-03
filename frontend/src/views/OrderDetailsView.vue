<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminHeader from "@/components/AdminHeader.vue";

const route = useRoute();
const router = useRouter();
const order = ref("");
const statusOptions = ["In asteptare", "Expediata", "Livrata"];
const selectedStatus = ref("");
const loading = ref(true);
const errorMessage = ref("");

const fetchOrderDetails = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/order/getOrderById/${route.params.id}`
    );

    if (!response.ok) throw new Error("Eroare la preluarea detaliilor comenzii");

    const data = await response.json();
    if (data) {
      order.value = data;
      selectedStatus.value = data.status;
    }
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};

const updateOrderStatus = async () => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/order/updateOrder/${route.params.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ status: selectedStatus.value }),
      }
    );

    if (!response.ok) throw new Error("Eroare la actualizarea statusului");

    order.value.status = selectedStatus.value;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

onMounted(fetchOrderDetails);
</script>

<template>
  <AdminHeader />
  <div class="order-details-container">
    <h1>Detalii Comandă</h1>
    <div v-if="loading">Se încarcă...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else>
      <div class="order-info">
        <p v-if="order.id"><strong>ID comandă:</strong> {{ order.id }}</p>
        <p v-if="order.clientName"><strong>Client:</strong> {{ order.clientName }}</p>
        <p v-if="order.email"><strong>Email:</strong> {{ order.email }}</p>
        <p v-if="order.phone"><strong>Telefon:</strong> {{ order.phone }}</p>
        <p v-if="order.totalPrice"><strong>Preț total:</strong> {{ order.totalPrice }} Lei</p>
        <p v-if="order.status">
          <strong>Status: </strong>
          <span>
            {{ order.status }}
          </span>
        </p>

        <div class="status-update">
          <label for="status" style="margin-right: 10px"><strong>Modifică statusul:</strong></label>
          <select v-model="selectedStatus" id="status">
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <button @click="updateOrderStatus">Actualizează</button>
        </div>
      </div>
    </div>

    <router-link to="/admin/comenzi" class="back-button">Înapoi la comenzi</router-link>
  </div>
</template>

<style scoped>
.order-details-container {
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  padding: 2rem;
  background: var(--card-bg);
  border: 2px solid var(--accent-color);
  border-radius: 10px;
  background-color: var(--product-card-bg);
  color: var(--text-color);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.order-info p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

strong {
  font-weight: bold;
}

.status-update {
  margin-top: 1rem;
}

.status-update select {
  padding: 0.5rem;
  margin-right: 1rem;
}

.status-update button {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.status-update button:hover {
  background-color: var(--secondary-color);
}

.back-button {
  display: block;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;
  color: var(--text-color);
  text-decoration: underline;
  cursor: pointer;
}

.status-livrat {
  color: green;
  font-weight: bold;
}

.status-expediat {
  color: orange;
  font-weight: bold;
}

.status-asteptare {
  color: red;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
