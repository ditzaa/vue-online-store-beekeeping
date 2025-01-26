<script>
// import { Heart, Search, ShoppingCart, User } from "lucide-vue-next";

export default {
  name: "HeroComponent",
  components: {
    // Heart,
    // Search,
    // ShoppingCart,
    // User,
  },
};
</script>

<template>
  <section>
    <div class="hero-container">
      <div class="hero-message">
        <h3>Produse apicole naturale, direct din stupină!</h3>
        <p>
          Bun venit la The Bee's Store 🐝 ! Aici găsești produse apicole autentice, create cu grijă
          și pasiune pentru sănătatea și bunăstarea ta. Îți oferim o selecție specială de miere,
          propolis, polen și alte delicii naturale care îți vor îndulci fiecare zi. Bucură-te de
          darurile albinelor și comandă astăzi!
        </p>
      </div>
      <div class="hero-img-container">
        <img src="../assets/honey-jar.webp" alt="honey-jar" />
      </div>
    </div>
  </section>
</template>

<style>
section {
  background-color: var(--background-color);
}
.hero-container {
  display: flex;
  flex-direction: row;
}

.hero-container div {
  width: 50%;
}

.hero-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 80px;
  font-size: 1.3rem;
  text-align: center;
}

.hero-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-img-container img {
  height: 20rem;
  width: 20rem;
}

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hero-message {
    padding: 0;
  }

  .hero-message > * {
    width: 150%;
    margin: 10px;
    font-size: 1.2rem;
  }

  .hero-img-container img {
    height: 17rem;
    width: 17rem;
  }
}
</style>
