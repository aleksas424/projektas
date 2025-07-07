<template>
  <section class="contacts" id="contacts">
    <div class="container">
      <h2>Kontaktai</h2>
      <p><strong>Adresas:</strong> {{ contacts.address }}</p>
      <p><strong>Telefonas:</strong> {{ contacts.phone }}</p>
      <p><strong>El. paštas:</strong> {{ contacts.email }}</p>
    </div>

    <form class="contact-form" @submit.prevent>
      <input type="text" placeholder="Jūsų vardas" required />
      <input type="email" placeholder="El. paštas" required />
      <textarea rows="4" placeholder="Jūsų žinutė" required></textarea>
      <button type="submit">Siųsti</button>
    </form>

    <div class="contact-info">
      <p>📞 Tel.: <a href="tel:+37060000000">+370 600 00000</a></p>
      <p>✉️ El. paštas: <a href="mailto:info@imone.lt">info@imone.lt</a></p>
      <p>📍 Adresas: Daubos g. 1A, Šiauliai</p>
    </div>

    <div class="map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.127122204865!2d23.3016905!3d55.9303277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e3b90d49758f%3A0xf3b5f91cdebe5fa0!2sDaubos%20g.%201A%2C%2076213%20%C5%A0iauliai!5e0!3m2!1slt!2slt!4v1720100000000"
    style="border:0; width:100%; height:300px;"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
  <small>
    <a href="https://www.google.com/maps?q=Daubos+g.+1A,+%C5%A0iauliai" target="_blank">
      Rodyti didesniame žemėlapyje
    </a>
  </small>
</div>

  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ContactsSection',
  data() {
    return {
      contacts: {
        address: '',
        phone: '',
        email: ''
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3001/api/data')
      .then(res => {
        this.contacts = res.data.contacts || this.contacts;
      });
  }
}
</script>

<style scoped>
.contacts {
  padding: 60px 20px;
  background: linear-gradient(to right, #0f0f0f, #1a1a1a);
  box-shadow: 0 2px 12px rgba(160, 6, 6, 0.7);
  text-align: center;
  color: #eee;
}

h2 {
  font-size: 2.6rem;
  margin-bottom: 30px;
  color: #42b983;
  font-weight: 700;
  letter-spacing: 1px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  margin: 0 auto 40px auto;
}

.contact-form input,
.contact-form textarea {
  background: #ffffff;
  padding: 14px 16px;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}

.contact-form button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;
}

.contact-form button:hover {
  background: #369870;
  transform: translateY(-2px);
}

.contact-info {
  font-size: 1.15rem;
  color: #ddd;
  margin-bottom: 32px;
  line-height: 1.8;
}

.contact-info a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.contact-info a:hover {
  text-decoration: underline;
}

.map {
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.map iframe {
  width: 100%;
  height: 300px;
  border: 0;
}

.map small {
  display: block;
  margin-top: 8px;
  font-size: 0.9rem;
  color: #aaa;
}

</style>
