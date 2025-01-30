<script setup>
import { ref } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

const email = ref("");
const password = ref("");
const name = ref("");
const phone = ref("");
const adress = ref("");
const locality = ref("");
const county = ref("");

const handleRegister = () => {
  // Adaugă logica pentru creare profil administrator nou
  console.log("Email:", email.value, "Password:", password.value, "Name: ", name.value);
};
</script>

<template>
  <HeaderComponent />
  <section class="register-view">
    <h1>Creare cont</h1>
    <form class="register-form" @submit.prevent="handleRegister">
      <label for="name">Nume complet:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="phone">Nr. telefon:</label>
      <input type="text" id="phone" v-model="phone" required />

      <label for="adress">Adresa:</label>
      <input type="text" id="adress" v-model="adress" required />

      <label for="locality">Localitate:</label>
      <input type="text" id="locality" v-model="locality" required />

      <label for="county">Judet/Sector:</label>
      <input type="text" id="county" v-model="county" required />

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
  padding-top: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: -30px;
  font-size: 0.9rem;
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
