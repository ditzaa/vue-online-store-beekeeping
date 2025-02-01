<script setup>
import { Heart, Search, ShoppingCart, User } from "lucide-vue-next";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const searchQuery = ref("");
const showLoginModal = ref(false);
const username = localStorage.getItem("username");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/produse", query: { query: searchQuery.value } });
  }
};

const handleKeyPress = (event) => {
  if (event.key == "Enter") {
    handleSearch();
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

const goToFavorites = () => {
  if (authStore.isAuthenticated) {
    router.push("/favorites");
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <header class="header-container">
    <div class="icons">
      <ShoppingCart class="icon" :size="32" />
      <Heart class="icon" id="heart-icon" :size="32" />
      <User class="icon" fill="var(--text-color)" :size="32" @click="showLoginModal = true" />
    </div>
    <h1 class="title">The Bee's Store 🐝</h1>

    <nav>
      <ul class="links-list">
        <li><RouterLink class="links" to="/">Acasă</RouterLink></li>
        <li><RouterLink class="links" to="/produse/miere">Miere</RouterLink></li>
        <li><RouterLink class="links" to="/produse/altele">Altele</RouterLink></li>
        <li><RouterLink class="links" to="/despre-noi">Despre noi</RouterLink></li>
      </ul>
    </nav>
    <div class="search-bar">
      <Search class="icon" :size="32" />
      <input
        type="text"
        placeholder="Caută produse..."
        class="search-input"
        v-model="searchQuery"
        @keypress="handleKeyPress"
      />
    </div>
  </header>
  <!-- Modal -->
  <div v-if="showLoginModal" class="modal-overlay" @click.self="showLoginModal = false">
    <div class="modal-content">
      <h2 v-if="authStore.isAuthenticated">Salut, {{ username }}!</h2>
      <div v-else>
        <button class="modal-button" @click="$router.push('/login')">Autentificare</button>
        <button class="modal-button" @click="$router.push('/register')">Înregistrare</button>
      </div>
      <button v-if="authStore.isAuthenticated" class="modal-button logout" @click="handleLogout">
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: var(--primary-color);
  padding: 1rem;
  text-align: center;
}

.title {
  font-size: 2rem;
  color: var(--text-color);
  margin: 0px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.modal-button {
  background: var(--accent-color);
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
}

.modal-button.logout {
  background: red;
}

.icons {
  display: flex;
  justify-content: right;
  gap: 15px;
}

.icon {
  cursor: pointer;
  color: var(--text-color);
}

#heart-icon {
  color: red;
  fill: red;
}

.icon:hover {
  filter: brightness(150%);
}

#heart-icon:hover {
  color: var(--heart-hover-color);
  fill: var(--heart-hover-color);
}

ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-right: 30px;
}

.links {
  font-size: 1.25rem;
  color: var(--text-color);
  text-decoration: none;
}

.links:hover {
  color: var(--accent-color);
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}

.search-input {
  width: 50%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--accent-color);
  border-radius: 10px;
  outline: none;
  margin-left: 15px;
}

@media (min-width: 768px) and (max-width: 1200px) {
  .header-container {
    text-align: center;
  }

  .title {
    font-size: 2rem;
  }

  .links {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    text-align: center;
    border-radius: 8px;
    height: 10%;
  }

  .title {
    font-size: 1.5rem;
  }

  .links-list {
    display: flex;
    flex-direction: column;
  }

  .links-list li {
    margin: 5px 0px;
  }

  .links {
    font-size: 1.2rem;
  }

  .search-input {
    width: 80%;
  }
}
</style>
