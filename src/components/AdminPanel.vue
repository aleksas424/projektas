<template>
  <div class="admin-panel">
    <h2 class="admin-panel__title">Admin panelė</h2>
    <button @click="logout" class="admin-panel__logout">Atsijungti</button>
    <form @submit.prevent>
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Hero sekcija</h3>
        <input v-model="data.hero.title" placeholder="Hero antraštė" class="admin-panel__input" />
        <input v-model="data.hero.subtitle" placeholder="Hero aprašymas" class="admin-panel__input" />
        <input type="file" @change="uploadFile($event, 'hero', 'image')" class="admin-panel__file-input" />
        <img v-if="data.hero.image" :src="data.hero.image" class="admin-panel__image" />
        <button type="button" @click="saveSection('hero')" class="admin-panel__button">Išsaugoti hero</button>
        <span v-if="msg.hero" :style="{color: msg.heroColor}" class="admin-panel__message">{{ msg.hero }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Apie mus</h3>
        <textarea v-model="data.about.text" placeholder="Apie mus tekstas" class="admin-panel__textarea"></textarea>
        <input type="file" @change="uploadFile($event, 'about', 'image')" class="admin-panel__file-input" />
        <img v-if="data.about.image" :src="data.about.image" class="admin-panel__image" />
        <button type="button" @click="saveSection('about')" class="admin-panel__button">Išsaugoti apie mus</button>
        <span v-if="msg.about" :style="{color: msg.aboutColor}" class="admin-panel__message">{{ msg.about }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Paslaugos</h3>
        <div v-for="(service, idx) in data.services" :key="idx" class="admin-panel__service">
          <input v-model="service.title" placeholder="Pavadinimas" class="admin-panel__input" />
          <input v-model="service.desc" placeholder="Aprašymas" class="admin-panel__input" />
          <input type="file" @change="uploadFile($event, 'services', 'image', idx)" class="admin-panel__file-input" />
          <img v-if="service.image" :src="service.image" class="admin-panel__image" />
        </div>
        <button type="button" @click="addService" class="admin-panel__button">Pridėti paslaugą</button>
        <button type="button" @click="saveSection('services')" class="admin-panel__button">Išsaugoti paslaugas</button>
        <span v-if="msg.services" :style="{color: msg.servicesColor}" class="admin-panel__message">{{ msg.services }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Galerija</h3>
        <div v-for="(img, idx) in data.gallery" :key="idx" class="admin-panel__gallery-item">
          <input type="file" @change="uploadFile($event, 'gallery', 'image', idx)" class="admin-panel__file-input" />
          <img v-if="img.image" :src="img.image" class="admin-panel__image" />
        </div>
        <button type="button" @click="addGalleryImage" class="admin-panel__button">Pridėti nuotrauką</button>
        <button type="button" @click="saveSection('gallery')" class="admin-panel__button">Išsaugoti galeriją</button>
        <span v-if="msg.gallery" :style="{color: msg.galleryColor}" class="admin-panel__message">{{ msg.gallery }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Kontaktai</h3>
        <input v-model="data.contacts.address" placeholder="Adresas" class="admin-panel__input" />
        <input v-model="data.contacts.phone" placeholder="Telefonas" class="admin-panel__input" />
        <input v-model="data.contacts.email" placeholder="El. paštas" class="admin-panel__input" />
        <button type="button" @click="saveSection('contacts')" class="admin-panel__button">Išsaugoti kontaktus</button>
        <span v-if="msg.contacts" :style="{color: msg.contactsColor}" class="admin-panel__message">{{ msg.contacts }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Rėmėjai</h3>
        <div v-for="(sponsor, idx) in data.sponsors" :key="idx" class="admin-panel__sponsor">
          <input v-model="sponsor.name" placeholder="Pavadinimas" class="admin-panel__input" />
          <input type="file" @change="uploadFile($event, 'sponsors', 'image', idx)" class="admin-panel__file-input" />
          <img v-if="sponsor.image" :src="sponsor.image" class="admin-panel__image" />
        </div>
        <button type="button" @click="addSponsor" class="admin-panel__button">Pridėti rėmėją</button>
        <button type="button" @click="saveSection('sponsors')" class="admin-panel__button">Išsaugoti rėmėjus</button>
        <span v-if="msg.sponsors" :style="{color: msg.sponsorsColor}" class="admin-panel__message">{{ msg.sponsors }}</span>
      </div>
      <hr class="admin-panel__divider" />
      <div class="admin-panel__section">
        <h3 class="admin-panel__section-title">Atsiliepimai</h3>
        <div v-for="(t, idx) in data.testimonials" :key="idx" class="admin-panel__testimonial">
          <input v-model="t.author" placeholder="Autorius" class="admin-panel__input" />
          <textarea v-model="t.text" placeholder="Atsiliepimas" class="admin-panel__textarea"></textarea>
        </div>
        <button type="button" @click="addTestimonial" class="admin-panel__button">Pridėti atsiliepimą</button>
        <button type="button" @click="saveSection('testimonials')" class="admin-panel__button">Išsaugoti atsiliepimus</button>
        <span v-if="msg.testimonials" :style="{color: msg.testimonialsColor}" class="admin-panel__message">{{ msg.testimonials }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminPanel',
  data() {
    return {
      data: {
        hero: {}, about: {}, services: [], gallery: [], contacts: {}, sponsors: [], testimonials: []
      },
      msg: {
        hero: '', heroColor: 'green',
        about: '', aboutColor: 'green',
        services: '', servicesColor: 'green',
        gallery: '', galleryColor: 'green',
        contacts: '', contactsColor: 'green',
        sponsors: '', sponsorsColor: 'green',
        testimonials: '', testimonialsColor: 'green',
      }
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      const res = await axios.get('http://localhost:3001/api/data');
      this.data = res.data;
    },
    async saveSection(section) {
      const token = localStorage.getItem('adminToken');
      let payload = {};
      payload[section] = this.data[section];
      try {
        // Gauti visus duomenis, atnaujinti tik vieną sekciją ir siųsti viską
        const all = { ...this.data, ...payload };
        await axios.post('http://localhost:3001/api/data', all, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.msg[section] = 'Išsaugota!';
        this.msg[section + 'Color'] = 'green';
        setTimeout(() => this.msg[section] = '', 2000);
      } catch {
        this.msg[section] = 'Klaida saugant';
        this.msg[section + 'Color'] = 'red';
        setTimeout(() => this.msg[section] = '', 2000);
      }
    },
    async uploadFile(e, section, field, idx) {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      if (idx !== undefined) {
        this.data[section][idx][field] = 'http://localhost:3001' + res.data.url;
      } else {
        this.data[section][field] = 'http://localhost:3001' + res.data.url;
      }
    },
    addService() {
      this.data.services.push({ title: '', desc: '', image: '' });
    },
    addGalleryImage() {
      this.data.gallery.push({ image: '' });
    },
    addSponsor() {
      this.data.sponsors.push({ name: '', image: '' });
    },
    addTestimonial() {
      this.data.testimonials.push({ author: '', text: '' });
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/adminpanel');
    }
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 800px;
  margin: 40px auto;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 32px;
  font-family: 'Roboto', sans-serif;
}

.admin-panel__title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.admin-panel__logout {
  float: right;
  padding: 8px 18px;
  background: #ff6363;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.admin-panel__section {
  margin-bottom: 20px;
}

.admin-panel__section-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.admin-panel__input, .admin-panel__textarea {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: 'Roboto', sans-serif;
}

.admin-panel__textarea {
  resize: vertical;
}

.admin-panel__file-input {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.admin-panel__image {
  display: block;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 120px;
}

.admin-panel__button {
  margin: 8px 0;
  padding: 12px 24px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
}

.admin-panel__message {
  display: block;
  margin-top: 8px;
  font-size: 14px;
}

.admin-panel__divider {
  border: 1px solid #ddd;
  margin: 20px 0;
}
</style>