<script setup>
import { ref } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";

const email = ref("");
const password = ref("");

const handleRegister = () => {
  // Adaugă logica pentru creare profil administrator nou
  console.log("Email:", email.value, "Password:", password.value);
};
</script>

<template>
  <AdminHeader></AdminHeader>
  <section class="register-view">
    <h1>Creare profil administrator nou</h1>
    <form @submit.prevent="handleRegister">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="password" required />

      <button class="submit-button" type="submit">Înregistrare</button>
    </form>
  </section>
</template>

<style scoped>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-bottom: 32%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 10px;
  border-width: 1px;
  width: 400px;
}

.submit-button {
  border-radius: 10px;
  width: 200px;
  align-self: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: var(--secondary-color);
}

@media (max-width: 768px) {
  input {
    width: 300px;
  }

  h1 {
    text-align: center;
  }
}
</style>
