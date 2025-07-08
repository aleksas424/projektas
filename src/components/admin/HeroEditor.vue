<template>
  <div class="hero-editor">
    <h2>Hero sekcijos redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="saveHero">
      <label>Pavadinimas:</label>
      <input v-model="hero.title" required />
      <label>Paantraštė:</label>
      <input v-model="hero.subtitle" required />
      <label>Paveikslėlis:</label>
      <input type="file" @change="onFileChange" />
      <div v-if="hero.image">
        <img :src="hero.image" alt="Hero" class="preview-img" />
      </div>
      <button type="submit">Išsaugoti</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HeroEditor',
  emits: ['auth-error'],
  data() {
    return {
      hero: { title: '', subtitle: '', image: '' },
      newImageFile: null,
      message: ''
    }
  },
  mounted() {
    this.fetchHero();
  },
  methods: {
    async fetchHero() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.hero = res.data.hero || { title: '', subtitle: '', image: '' };
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    onFileChange(e) {
      this.newImageFile = e.target.files[0];
    },
    async saveHero() {
      const token = localStorage.getItem('adminToken');
      let imageUrl = this.hero.image;
      try {
        if (this.newImageFile) {
          const formData = new FormData();
          formData.append('file', this.newImageFile);
          const uploadRes = await axios.post('http://localhost:3001/api/upload', formData, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          imageUrl = `http://localhost:3001${uploadRes.data.url}`;
        }
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.hero = {
          title: this.hero.title,
          subtitle: this.hero.subtitle,
          image: imageUrl
        };
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Hero sekcija išsaugota!');
        this.fetchHero();
        this.newImageFile = null;
      } catch (e) {
        this.handleAuthError(e, 'Klaida išsaugant hero sekciją');
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
.hero-editor {
  max-width: 500px;
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
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.preview-img {
  width: 180px;
  margin-top: 8px;
  border-radius: 8px;
}
</style> 