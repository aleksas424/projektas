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
    }, 2000);
  }
}
</script>

<style scoped>
.testimonials {
  padding: 50px 20px;
  background: #fff;
  text-align: center;
}

.testimonial {
  background: #f5f5f5;
  padding: 24px 32px;
  border-radius: 8px;
  max-width: 500px;
  margin: 24px auto 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.testimonial span {
  display: block;
  margin-top: 12px;
  color: #888;
  font-size: 0.95rem;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
