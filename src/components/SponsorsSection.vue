<template>
  <section class="sponsors" id="sponsors">
    <h2>Mūsų partneriai</h2>
    <div class="sponsors-list">
      <div class="sponsor" v-for="sponsor in sponsors" :key="sponsor.name">
        <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SponsorsSection',
  data() {
    return {
      sponsors: [
        { name: 'Remėjas 1', logo: require('../assets/logo.jpg') },
        { name: 'Remėjas 2', logo: require('../assets/adiada-logo.png') },
        { name: 'Remėjas 3', logo: require('../assets/raudonas.png') },
        { name: 'Remėjas 4', logo: require('../assets/fantazijos.png') }
      ]
    }
  }
}
</script>

<style scoped>
.sponsors {
  padding: 50px 20px;
  background: #fff;
  text-align: center;
}

.sponsors h2 {
  font-size: 2.5rem;
  margin-bottom: 32px;
  color: #2c3e50;
}

.sponsors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  align-items: center;
}

.sponsor {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  min-height: 100px;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.sponsor:hover {
  box-shadow: 0 6px 24px rgba(66, 185, 131, 0.12);
  transform: scale(1.03);
}

.sponsor-logo {
  max-width: 180px;
  max-height: 80px;
  object-fit: contain;
}

/* Responsive: stacked layout on mobile */
@media (max-width: 900px) {
  .sponsors-list {
    flex-direction: column;
    gap: 20px;
  }

  .sponsor {
    min-width: auto;
    width: 100%;
    max-width: 300px;
  }

  .sponsor-logo {
    max-width: 100%;
    max-height: 80px;
  }
}
</style> 