<template>
  <div class="about-editor">
    <h2>Apie sekcijos redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="saveAbout">
      <label>Apie mus tekstas:</label>
      <textarea v-model="about.text" required rows="4" />
      <label>Paveikslėlis:</label>
      <input type="file" @change="onFileChange" />
      <div v-if="about.image">
        <img :src="about.image" alt="Apie mus" class="preview-img" />
        <button type="button" class="delete-img-btn" @click="deleteImage">Ištrinti nuotrauką</button>
      </div>
      <button type="submit">Išsaugoti</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AboutEditor',
  emits: ['auth-error'],
  data() {
    return {
      about: { text: '', image: '' },
      newImageFile: null,
      message: ''
    }
  },
  mounted() {
    this.fetchAbout();
  },
  methods: {
    async fetchAbout() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.about = res.data.about || { text: '', image: '' };
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    onFileChange(e) {
      this.newImageFile = e.target.files[0];
    },
    async saveAbout() {
      const token = localStorage.getItem('adminToken');
      let imageUrl = this.about.image;
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
        data.about = {
          text: this.about.text,
          image: imageUrl
        };
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Apie sekcija išsaugota!');
        this.fetchAbout();
        this.newImageFile = null;
      } catch (e) {
        this.handleAuthError(e, 'Klaida išsaugant apie sekciją');
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
    },
    async deleteImage() {
      this.about.image = '';
      await this.saveAbout();
    }
  }
}
</script>

<style scoped>
.about-editor {
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
.delete-img-btn {
  background: #ffdddd;
  color: #a00;
  border: none;
  border-radius: 4px;
  padding: 6px 14px;
  margin-top: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.delete-img-btn:hover {
  background: #ffb3b3;
}
</style> 