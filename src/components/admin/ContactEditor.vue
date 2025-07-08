<template>
  <div class="contacts-editor">
    <h2>Kontaktų redagavimas</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="saveContacts">
      <label>Adresas:</label>
      <input v-model="contacts.address" required />
      <label>Telefonas:</label>
      <input v-model="contacts.phone" required />
      <label>El. paštas:</label>
      <input v-model="contacts.email" required />
      <button type="submit">Išsaugoti</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ContactEditor',
  emits: ['auth-error'],
  data() {
    return {
      contacts: { address: '', phone: '', email: '' },
      message: ''
    }
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.contacts = res.data.contacts || { address: '', phone: '', email: '' };
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    async saveContacts() {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.contacts = { ...this.contacts };
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Kontaktai išsaugoti!');
        this.fetchContacts();
      } catch (e) {
        this.handleAuthError(e, 'Klaida išsaugant kontaktus');
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
.contacts-editor {
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
</style> 