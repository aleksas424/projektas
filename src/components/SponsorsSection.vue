<template>
  <section class="sponsors" id="sponsors">
    <h2>Rėmėjai</h2>
    <div class="sponsor-list">
      <div class="sponsor" v-for="(sponsor, idx) in sponsors" :key="idx">
        <img v-if="sponsor.image" :src="sponsor.image" :alt="sponsor.name" class="sponsor-img" />
        <p>{{ sponsor.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SponsorsSection',
  data() {
    return {
      sponsors: []
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        this.sponsors = res.data.sponsors || [];
      });
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

.sponsor-list {
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

.sponsor-img {
  max-width: 160px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.75;
  transition: all 0.3s ease;
}

.sponsor:hover .sponsor-img {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

/* Responsive: stacked layout on mobile */
@media (max-width: 800px) {
  .sponsor-list {
    flex-direction: column;
    gap: 20px;
  }

  .sponsor {
    width: 100%;
    max-width: 200px;
  }

  .sponsor-img {
    max-width: 100%;
    max-height: 80px;
  }
}

</style> 