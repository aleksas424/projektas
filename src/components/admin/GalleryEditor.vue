<template>
  <div class="gallery-editor">
    <h2>Galerijos redagavimas</h2>

    <!-- Pranešimas -->
    <div v-if="message" class="message">{{ message }}</div>

    <!-- Įkelti naują paveikslėlį -->
    <form @submit.prevent="uploadImage" class="upload-form">
      <input type="file" @change="onFileChange" required />
      <select v-model="newImageCategory" required>
        <option disabled value="">Pasirinkite kategoriją</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <button type="submit">Įkelti</button>
    </form>

    <!-- Paveikslėlių sąrašas -->
    <div class="images-list">
      <div v-for="(img, idx) in images" :key="img.image" class="image-item">
        <img :src="img.image" alt="Galerijos nuotrauka" />
        <select v-model="img.category_id" @change="updateImageCategory(idx, img)">
          <option disabled value="">Be kategorijos</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <button @click="deleteImage(idx)">Ištrinti</button>
      </div>
    </div>

    <!-- Kategorijų valdymas -->
    <div class="categories-section">
      <h3>Kategorijos</h3>
      <ul>
        <li v-for="cat in categories" :key="cat.id">
          {{ cat.name }}
          <button @click="deleteCategory(cat.id)">Trinti</button>
        </li>
      </ul>
      <form @submit.prevent="addCategory">
        <input v-model="newCategoryName" placeholder="Nauja kategorija" required />
        <button type="submit">Pridėti</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GalleryEditor',
  emits: ['auth-error'],
  data() {
    return {
      images: [],
      categories: [],
      newImageFile: null,
      newImageCategory: '',
      newCategoryName: '',
      message: ''
    }
  },
  mounted() {
    this.fetchImages();
    this.fetchCategories();
  },
  methods: {
    async fetchImages() {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        this.images = (res.data.gallery || []).map(img => ({ ...img, category_id: img.category_id || '' }));
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    async fetchCategories() {
      try {
        const res = await axios.get('http://localhost:3001/api/gallery-categories');
        this.categories = res.data;
      } catch (e) {
        this.handleAuthError(e);
      }
    },
    onFileChange(e) {
      this.newImageFile = e.target.files[0];
    },
    async uploadImage() {
      if (!this.newImageFile || !this.newImageCategory) return;
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('file', this.newImageFile);
      try {
        const uploadRes = await axios.post('http://localhost:3001/api/upload', formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // Pridėti į gallery
        const newImg = {
          image: `http://localhost:3001${uploadRes.data.url}`,
          category_id: this.newImageCategory
        };
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.gallery = data.gallery || [];
        data.gallery.push(newImg);
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paveikslėlis įkeltas!');
        this.newImageFile = null;
        this.newImageCategory = '';
        this.fetchImages();
      } catch (e) {
        this.handleAuthError(e, 'Klaida įkeliant paveikslėlį');
      }
    },
    async deleteImage(idx) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.gallery.splice(idx, 1);
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Paveikslėlis ištrintas!');
        this.fetchImages();
      } catch (e) {
        this.handleAuthError(e, 'Klaida trinant paveikslėlį');
      }
    },
    async updateImageCategory(idx, img) {
      const token = localStorage.getItem('adminToken');
      try {
        const dataRes = await axios.get('http://localhost:3001/api/data');
        const data = dataRes.data;
        data.gallery[idx].category_id = img.category_id;
        await axios.post('http://localhost:3001/api/data', data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.showMessage('Kategorija atnaujinta!');
        this.fetchImages();
      } catch (e) {
        this.handleAuthError(e, 'Klaida keičiant kategoriją');
      }
    },
    async addCategory() {
      if (!this.newCategoryName) return;
      try {
        await axios.post('http://localhost:3001/api/gallery-categories', { name: this.newCategoryName });
        this.showMessage('Kategorija pridėta!');
        this.newCategoryName = '';
        this.fetchCategories();
      } catch (e) {
        this.handleAuthError(e, 'Klaida pridedant kategoriją');
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3001/api/gallery-categories/${id}`);
        this.showMessage('Kategorija ištrinta!');
        this.fetchCategories();
      } catch (e) {
        this.handleAuthError(e, 'Klaida trinant kategoriją');
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
.gallery-editor {
  max-width: 900px;
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
.upload-form {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}
.images-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 32px;
}
.image-item {
  background: #f8f8f8;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}
.image-item img {
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
.image-item select, .image-item button {
  margin-top: 4px;
}
.categories-section {
  margin-top: 32px;
}
.categories-section ul {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
}
.categories-section li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.categories-section button {
  background: #ffdddd;
  color: #a00;
  border: none;
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
}
.categories-section form {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style> 