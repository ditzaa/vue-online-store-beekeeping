<!-- <script setup>
import { ref } from "vue";
import AdminHeader from "@/components/AdminHeader.vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  // Adaugă logica pentru autentificare
  console.log("Email:", email.value, "Password:", password.value);
};
</script>

<template>
  <AdminHeader></AdminHeader>
  <section class="login-view">
    <h1>Autentificare</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="adminPass" required />

      <button class="submit-button" type="submit">Autentificare</button>
    </form>
  </section>
</template> -->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminHeader from "@/components/AdminHeader.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const adminPass = ref("");

const handleLogin = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_DOMAIN_NAME}:${
        import.meta.env.VITE_PORT_BACK_END
      }/api/user/loginAdmin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          adminPass: adminPass.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Eroare la autentificare");
    }

    localStorage.setItem("adminToken", data.token);
    router.push("/admin/comenzi");
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <AdminHeader />
  <section class="login-view">
    <h1>Autentificare</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Parolă:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="adminPass">Parolă Admin:</label>
      <input type="password" id="adminPass" v-model="adminPass" required />

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
  /* border-radius: 5px; */
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
