<script setup>
import { Heart, Search, ShoppingCart, User } from "lucide-vue-next";
</script>

<template>
  <header class="header-container">
    <h1 class="title">The Bee's Store 🐝</h1>

    <nav>
      <ul class="links-list">
        <li><RouterLink class="links" to="/admin/comenzi">Comenzi</RouterLink></li>
        <li><RouterLink class="links" to="/produse/miere">Produse</RouterLink></li>
        <li><RouterLink class="links" to="/produse/altele">Statistici</RouterLink></li>
      </ul>
    </nav>
    <div class="search-bar">
      <Search class="icon" :size="32" />
      <input type="text" placeholder="Caută produse..." class="search-input" />
    </div>
  </header>
</template>

<style>
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
