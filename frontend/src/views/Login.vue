<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { useAuthStore } from "@/stores/authStore";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.isAuthenticated) {
    router.push("/");
  }
};
</script>

<template>
  <HeaderComponent />
  <section class="login-view">
    <h1>Autentificare</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="password" required />

      <button class="submit-button" type="submit">Autentificare</button>
    </form>
  </section>
</template>

<style scoped>
.login-view {
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
