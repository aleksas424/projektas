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
        { name: 'Remėjas 2', logo: require('../assets/sponsoriai/adiada-logo.png') },
        { name: 'Remėjas 3', logo: require('../assets/sponsoriai/raudonas.png') },
        { name: 'Remėjas 4', logo: require('../assets/sponsoriai/fantazijos.png') }
      ]
    }
  }
}
</script>

<style scoped>
.sponsors {
  padding: 60px 20px;
  background: linear-gradient(to right, #0f0f0f, #1a1a1a);
  box-shadow: 0 4px 12px rgba(160, 6, 6, 0.6);
  text-align: center;
}

.sponsors h2 {
  font-size: 2.6rem;
  margin-bottom: 40px;
  color: #42b983;
  font-weight: 700;
  letter-spacing: 1px;
}

.sponsors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  align-items: center;
}

.sponsor {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 30px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 100px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sponsor:hover {
  transform: translateY(-5px) scale(1.04);
  box-shadow: 0 12px 24px rgba(66, 185, 131, 0.25);
}

.sponsor-logo {
  max-width: 160px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.75;
  transition: all 0.3s ease;
}

.sponsor:hover .sponsor-logo {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

/* Responsive: stacked layout on mobile */
@media (max-width: 800px) {
  .sponsors-list {
    flex-direction: column;
    gap: 20px;
  }

  .sponsor {
    width: 100%;
    max-width: 200px;
  }

  .sponsor-logo {
    max-width: 100%;
    max-height: 80px;
  }
}

</style> 