<template>
  <section class="testimonials" id="testimonials">
    <h2>Atsiliepimai</h2>
    <div class="testimonials-list">
      <div class="testimonial" v-for="(t, idx) in testimonials" :key="idx">
        <blockquote>{{ t.text }}</blockquote>
        <p class="author">- {{ t.author }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      testimonials: []
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        this.testimonials = res.data.testimonials || [];
      });
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