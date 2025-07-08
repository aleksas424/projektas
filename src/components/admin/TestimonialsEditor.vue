<template>
  <div class="testimonials-editor">
    <h2>Atsiliepimų redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="addTestimonial" class="add-form">
      <input v-model="newTestimonial.author" placeholder="Vardas" required />
      <input v-model="newTestimonial.text" placeholder="Atsiliepimas" required />
      <button type="submit">Pridėti atsiliepimą</button>
    </form>
    <div class="testimonials-list">
      <div v-for="(testimonial, idx) in testimonials" :key="idx" class="testimonial-item">
        <input v-model="testimonial.author" @change="updateTestimonial(idx)" />
        <input v-model="testimonial.text" @change="updateTestimonial(idx)" />
        <button @click="deleteTestimonial(idx)">Ištrinti</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TestimonialsEditor',
  emits: ['auth-error'],
  data() {
    return {
      testimonials: [],
      newTestimonial: { author: '', text: '' },
      message: ''
    }
  },
  mounted() {
    this.fetchTestimonials();
  },
  methods: {
    async fetchTestimonials() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.testimonials = res.data.testimonials || [];
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    async addTestimonial() {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.testimonials = data.testimonials || [];
        data.testimonials.push({
          author: this.newTestimonial.author,
          text: this.newTestimonial.text
        });
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Atsiliepimas pridėtas!');
        this.newTestimonial = { author: '', text: '' };
        this.fetchTestimonials();
      } catch (e) {
        this.handleAuthError(e, 'Klaida pridedant atsiliepimą');
      }
    },
    async updateTestimonial(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.testimonials[idx] = this.testimonials[idx];
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Atsiliepimas atnaujintas!');
      } catch (e) {
        this.handleAuthError(e, 'Klaida atnaujinant atsiliepimą');
      }
    },
    async deleteTestimonial(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.testimonials.splice(idx, 1);
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Atsiliepimas ištrintas!');
        this.fetchTestimonials();
      } catch (e) {
        this.handleAuthError(e, 'Klaida trinant atsiliepimą');
      }
    },
    showMessage(msg) {
      this.message = msg;
      setTimeout(() => { this.message = ''; }, 3000);
    },
    handleAuthError(e, fallbackMsg) {
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        this.$emit('auth-error');
      } else {
        this.showMessage(fallbackMsg || 'Klaida!');
      }
    }
  }
}
</script>

<style scoped>
.testimonials-editor {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
}
.message {
  background: #e0ffe0;
  color: #207c2f;
  padding: 10px 18px;
  border-radius: 6px;
  margin-bottom: 18px;
  text-align: center;
}
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  align-items: center;
}
.testimonials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.testimonial-item {
  background: #f8f8f8;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 260px;
  gap: 6px;
}
</style> 