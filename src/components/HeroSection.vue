<template>
  <section class="hero" id="hero">
    <video autoplay muted loop playsinline class="hero-video">
      <source src="../assets/Video.mp4" type="video/mp4" />
    </video>
    <div class="hero-overlay"></div> <!-- pridėtas tamsus sluoksnis -->
    <div class="hero-content">
      <img v-if="hero.image" :src="hero.image" alt="Įmonės logotipas" class="hero-logo" />
      <h1 class="hero-title">{{ hero.title }}</h1>
      <p class="hero-subtitle">{{ hero.subtitle }}</p>
      <button class="hero-cta" aria-label="Susisiekti su mumis">Registracija</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HeroSection',
  data() {
    return {
      hero: {
        title: '',
        subtitle: '',
        image: ''
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        this.hero = res.data.hero || this.hero;
      });
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translate(-50%, -50%);
  object-fit: cover;
  filter: brightness(0.7); /* gali sumažinti brightness dar daugiau arba išvis pašalinti, jei naudojies overlay */
}

/* Naujas tamsus sluoksnis virš video */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* reguliuok skaidrumą čia */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2; /* virš video ir overlay */
  color: white;
  padding: 20px;
  max-width: 600px;
}

.hero-logo {
  width: 180px;
  margin-bottom: 30px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7));
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 28px;
}

.hero-cta {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 16px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hero-cta:hover {
  background: #369870;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-cta {
    padding: 14px 28px;
    font-size: 1rem;
  }
}
</style>