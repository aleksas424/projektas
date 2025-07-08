<template>
  <div class="sponsors-editor">
    <h2>Rėmėjų redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="addSponsor" class="add-form">
      <input v-model="newSponsor.name" placeholder="Rėmėjo pavadinimas" required />
      <input type="file" @change="onFileChange" />
      <button type="submit">Pridėti rėmėją</button>
    </form>
    <div class="sponsors-list">
      <div v-for="(sponsor, idx) in sponsors" :key="idx" class="sponsor-item">
        <input v-model="sponsor.name" @change="updateSponsor(idx)" />
        <div>
          <img v-if="sponsor.image" :src="sponsor.image" alt="Rėmėjo logotipas" class="preview-img" />
        </div>
        <input type="file" @change="e => onSponsorImageChange(e, idx)" />
        <button @click="deleteSponsor(idx)">Ištrinti</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SponsorsEditor',
  emits: ['auth-error'],
  data() {
    return {
      sponsors: [],
      newSponsor: { name: '', image: '' },
      newSponsorFile: null,
      message: ''
    }
  },
  mounted() {
    this.fetchSponsors();
  },
  methods: {
    async fetchSponsors() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.sponsors = res.data.sponsors || [];
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    onFileChange(e) {
      this.newSponsorFile = e.target.files[0];
    },
    async addSponsor() {
      const token = localStorage.getItem('adminToken');
      let imageUrl = '';
      try {
        if (this.newSponsorFile) {
          const formData = new FormData();
          formData.append('file', this.newSponsorFile);
          const uploadRes = await axios.post('http://localhost:3001/api/upload', formData, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          imageUrl = `http://localhost:3001${uploadRes.data.url}`;
        }
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.sponsors = data.sponsors || [];
        data.sponsors.push({
          name: this.newSponsor.name,
          image: imageUrl
        });
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Rėmėjas pridėtas!');
        this.newSponsor = { name: '', image: '' };
        this.newSponsorFile = null;
        this.fetchSponsors();
      } catch (e) {
        this.handleAuthError(e, 'Klaida pridedant rėmėją');
      }
    },
    async updateSponsor(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.sponsors[idx] = this.sponsors[idx];
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Rėmėjas atnaujintas!');
      } catch (e) {
        this.handleAuthError(e, 'Klaida atnaujinant rėmėją');
      }
    },
    async onSponsorImageChange(e, idx) {
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
        data.sponsors[idx].image = imageUrl;
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Logotipas atnaujintas!');
        this.fetchSponsors();
      } catch (e) {
        this.handleAuthError(e, 'Klaida atnaujinant logotipą');
      }
    },
    async deleteSponsor(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.sponsors.splice(idx, 1);
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Rėmėjas ištrintas!');
        this.fetchSponsors();
      } catch (e) {
        this.handleAuthError(e, 'Klaida trinant rėmėją');
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
.sponsors-editor {
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
.sponsors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.sponsor-item {
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