<template>
  <section class="testimonials" id="testimonials">
    <h2>Atsiliepimai / Klientai</h2>
    <transition name="fade" mode="out-in">
      <div class="testimonial" :key="currentIndex">
        <p>{{ testimonials[currentIndex].text }}</p>
        <span>- {{ testimonials[currentIndex].author }}</span>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      currentIndex: 0,
      testimonials: [
        { text: 'Puiki komanda, profesionalus požiūris!', author: 'Jonas, UAB Statyba' },
        { text: 'Greitai ir kokybiškai atliko darbus.', author: 'Ona, MB Projektai' },
        { text: 'Rekomenduoju visiems, kas ieško patikimų partnerių.', author: 'Petras, Individuali veikla' }
      ]
    }
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }, 3000);
  }
}
</script>

<style scoped>
.testimonials {
  padding: 60px 20px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* švelnus gradientas */
  text-align: center;
}

.testimonials h2 {
  color: #42b983;
  font-size: 2.4rem;
  margin-bottom: 40px;
  font-weight: 700;
}

.testimonial {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.testimonial p {
  font-size: 1.2rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
}

.testimonial span {
  display: block;
  font-weight: 600;
  color: #555;
  font-size: 1rem;
}

/* Fade + scale transition */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>