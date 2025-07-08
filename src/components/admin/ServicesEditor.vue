<template>
  <div class="services-editor">
    <h2>Paslaugų redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="addService" class="add-form">
      <input v-model="newService.title" placeholder="Pavadinimas" required />
      <input v-model="newService.desc" placeholder="Aprašymas" required />
      <input type="file" @change="onFileChange" />
      <button type="submit">Pridėti paslaugą</button>
    </form>
    <div class="services-list">
      <div v-for="(service, idx) in services" :key="idx" class="service-item">
        <input v-model="service.title" @change="updateService(idx)" />
        <input v-model="service.desc" @change="updateService(idx)" />
        <div>
          <img v-if="service.image" :src="service.image" alt="Paslaugos nuotrauka" class="preview-img" />
        </div>
        <input type="file" @change="e => onServiceImageChange(e, idx)" />
        <button @click="deleteService(idx)">Ištrinti</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ServicesEditor',
  emits: ['auth-error'],
  data() {
    return {
      services: [],
      newService: { title: '', desc: '', image: '' },
      newServiceFile: null,
      message: ''
    }
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.services = res.data.services || [];
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    onFileChange(e) {
      this.newServiceFile = e.target.files[0];
    },
    async addService() {
      const token = localStorage.getItem('adminToken');
      let imageUrl = '';
      try {
        if (this.newServiceFile) {
          const formData = new FormData();
          formData.append('file', this.newServiceFile);
          const uploadRes = await axios.post('http://localhost:3001/api/upload', formData, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          imageUrl = `http://localhost:3001${uploadRes.data.url}`;
        }
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.services = data.services || [];
        data.services.push({
          title: this.newService.title,
          desc: this.newService.desc,
          image: imageUrl
        });
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paslauga pridėta!');
        this.newService = { title: '', desc: '', image: '' };
        this.newServiceFile = null;
        this.fetchServices();
      } catch (e) {
        this.handleAuthError(e, 'Klaida pridedant paslaugą');
      }
    },
    async updateService(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.services[idx] = this.services[idx];
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paslauga atnaujinta!');
      } catch (e) {
        this.handleAuthError(e, 'Klaida atnaujinant paslaugą');
      }
    },
    async onServiceImageChange(e, idx) {
      const token = localStorage.getItem('adminToken');
      const file = e.target.files[0];
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await axios.post('http://localhost:3001/api/upload', formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const imageUrl = `http://localhost:3001${uploadRes.data.url}`;
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.services[idx].image = imageUrl;
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paveikslėlis atnaujintas!');
        this.fetchServices();
      } catch (e) {
        this.handleAuthError(e, 'Klaida atnaujinant paveikslėlį');
      }
    },
    async deleteService(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.services.splice(idx, 1);
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paslauga ištrinta!');
        this.fetchServices();
      } catch (e) {
        this.handleAuthError(e, 'Klaida trinant paslaugą');
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
.services-editor {
  max-width: 700px;
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
.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.service-item {
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
.preview-img {
  width: 120px;
  margin-top: 4px;
  border-radius: 8px;
}
</style> 