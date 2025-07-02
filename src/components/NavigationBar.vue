<template>
  <header class="navbar">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="Logo">
    </div>
    <button class="menu-toggle" @click="toggleMenu" aria-label="Meniu jungiklis">
      ☰
    </button>
    <nav :class="{ open: isMenuOpen }" class="nav-links">
      <a href="#hero" @click.prevent="scrollToSection('hero')">Pradžia</a>
      <a href="#about" @click.prevent="scrollToSection('about')">Apie mus</a>
      <a href="#services" @click.prevent="scrollToSection('services')">Paslaugos</a>
      <a href="#gallery" @click.prevent="scrollToSection('gallery')">Galerija</a>
      <a href="#testimonials" @click.prevent="scrollToSection('testimonials')">Atsiliepimai</a>
      <a href="#contacts" @click.prevent="scrollToSection('contacts')">Kontaktai</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000000;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(160, 6, 6, 0.76);
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
}

.logo img {
  height: 60px;
  max-width: 140px;
  object-fit: contain;
}

.menu-toggle {
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

.nav-links {
  display: flex;
  gap: 20px;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.nav-links a {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 8px 12px;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.nav-links a:hover {
  color: #42b983;
}

/* Responsive styles */
@media (max-width: 900px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 24px;
  background-color: rgba(0, 0, 0, 0.95); /* Tamsus, bet permatomas fonas */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Realistiškas šešėlis */
  padding: 16px;
  border-radius: 8px;
  width: max-content;
  backdrop-filter: blur(6px); /* stilingas efektas */
  z-index: 15;
}

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 10px 0;
    font-size: 1rem;
  }

  .logo img {
    height: 50px;
    max-width: 120px;
  }
}
</style>
