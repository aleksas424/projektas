<template>
  <section class="services" id="services">
    <h2>Mūsų paslaugos</h2>
    <div class="services-list">
      <div class="service" v-for="(service, idx) in services" :key="idx" :style="{ backgroundImage: `url(${service.image})` }">
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ServicesSection',
  data() {
    return {
      services: []
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        this.services = res.data.services || [];
      });
  }
}
</script>

<style scoped>
.services {
  padding: 70px 20px;
  background: #000000;
  box-shadow: 0 2px 8px rgba(160, 6, 6, 0.76);
  text-align: center;
}

.services h2 {
  font-size: 2.6rem;
  margin-bottom: 42px;
  color: #42b983;
  font-weight: 700;
}

.services-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 20px 12px;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

.service {
  position: relative;
  flex: 0 0 220px; /* sumažintas plotis */
  height: 140px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  scroll-snap-align: start;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
}

.service:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 28px rgba(66, 185, 131, 0.2);
}

.service h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  max-width: 240px;
}

@media (min-width: 901px) {
  .services-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    overflow: visible;
    scroll-snap-type: none;
    padding: 0;
  }

  .service {
    flex: unset;
    width: 100%;
    height: 220px;
  }
}

@media (max-width: 600px) {
  .service h3 {
    font-size: 1.1rem;
  }

  .service {
    height: 180px;
  }
}

</style>
