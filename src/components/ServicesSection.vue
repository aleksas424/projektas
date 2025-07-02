<template>
  <section class="services" id="services">
    <h2>Mūsų paslaugos</h2>
    <div class="services-list">
      <div class="service" :style="{ backgroundImage: `url(${images.battery})` }">
        <h3>Baterijos Tvarkymas</h3>
      </div>
      <div class="service" :style="{ backgroundImage: `url(${images.consultation})` }">
        <h3>Konsultacijos</h3>
      </div>
      <div class="service" :style="{ backgroundImage: `url(${images.technical})` }">
        <h3>Techninis įgyvendinimas</h3>
      </div>
      <div class="service" :style="{ backgroundImage: `url(${images.support})` }">
        <h3>Priežiūra ir palaikymas</h3>
      </div>
    </div>
  </section>
</template>

<script>
import BatteryImage from '../assets/Battery.jpg'


export default {
  name: 'ServicesSection',
  data() {
    return {
      images: {
        battery: BatteryImage,
      }
    }
  }
}
</script>

<style scoped>
.services {
  padding: 60px 20px;
  background: #fff;
  text-align: center;
}

.services h2 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #2c3e50;
}

.services-list {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* sklandus slinkimas iOS */
  scroll-snap-type: x mandatory; /* kad būtų snap'as kortelėms */
  padding-bottom: 8px;
}

.service {
  position: relative;
  flex: 0 0 280px; /* fiksuotas plotis, neslepiam kortelės */
  height: 180px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  background-blend-mode: multiply;
  background-color: rgba(0,0,0,0.3);

  scroll-snap-align: start; /* snap point */
}

.service:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 24px rgba(66, 185, 131, 0.15);
}

.service h3 {
  position: relative;
  margin: 0 auto 10px auto;
  text-shadow: 0 2px 6px rgba(0,0,0,0.7);
  font-weight: 600;
  font-size: 1.3rem;
}

@media (min-width: 901px) {
  /* desktop – parodyti įprastai, keli stulpeliai */
  .services-list {
    flex-wrap: wrap;
    overflow-x: visible;
    scroll-snap-type: none;
  }

  .service {
    flex: 1 1 280px;
    max-width: 280px;
  }
}
</style>
