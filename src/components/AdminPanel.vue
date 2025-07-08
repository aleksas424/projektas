<template>
  <div class="admin-container">
    <aside class="sidebar">
      <button class="logout-btn" @click="logout">Atsijungti</button>
      <ul>
        <li v-for="item in sections" :key="item.key" @click="currentSection = item.key" :class="{ active: currentSection === item.key }">
          {{ item.label }}
        </li>
      </ul>
    </aside>
    <main class="editor">
      <div v-if="authErrorMsg" class="auth-error-msg">{{ authErrorMsg }}</div>
      <component :is="currentComponent" @auth-error="handleAuthError" />
    </main>
  </div>
</template>

<script>
import HeroEditor from './admin/HeroEditor.vue'
import AboutEditor from './admin/AboutEditor.vue'
import ServicesEditor from './admin/ServicesEditor.vue'
import GalleryEditor from './admin/GalleryEditor.vue'
import ContactEditor from './admin/ContactEditor.vue'
import TestimonialsEditor from './admin/TestimonialsEditor.vue'
import SponsorsEditor from './admin/SponsorsEditor.vue'

export default {
  components: {
    HeroEditor,
    AboutEditor,
    ServicesEditor,
    GalleryEditor,
    ContactEditor,
    TestimonialsEditor,
    SponsorsEditor
  },
  data() {
    return {
      currentSection: 'hero',
      sections: [
        { key: 'hero', label: 'Hero' },
        { key: 'about', label: 'Apie' },
        { key: 'services', label: 'Paslaugos' },
        { key: 'gallery', label: 'Galerija' },
        { key: 'contact', label: 'Kontaktai' },
        { key: 'testimonials', label: 'Atsiliepimai' },
        { key: 'sponsors', label: 'Rėmėjai' }
      ],
      authErrorMsg: ''
    }
  },
  computed: {
    currentComponent() {
      const map = {
        hero: 'HeroEditor',
        about: 'AboutEditor',
        services: 'ServicesEditor',
        gallery: 'GalleryEditor',
        contact: 'ContactEditor',
        testimonials: 'TestimonialsEditor',
        sponsors: 'SponsorsEditor'
      }
      return map[this.currentSection]
    }
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      next('/adminlogin');
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      next('/adminlogin');
    } else {
      next();
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('adminToken');
      this.$emit('logout');
    },
    handleAuthError() {
      this.authErrorMsg = 'Sesija baigėsi, prisijunkite iš naujo.';
      setTimeout(() => {
        this.authErrorMsg = '';
        this.logout();
      }, 2500);
    }
  }
}
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 220px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.logout-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  margin-bottom: 18px;
  cursor: pointer;
  align-self: stretch;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #c0392b;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.sidebar li {
  padding: 16px 0 16px 18px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 1.15rem;
  transition: background 0.2s;
}
.sidebar li.active, .sidebar li:hover {
  background: #34495e;
}
.editor {
  flex: 1;
  background: #f7f7f7;
  padding: 32px 40px;
  min-height: 100vh;
}
.auth-error-msg {
  background: #ffe0e0;
  color: #a00;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 18px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
