<template>
  <section class="contacts" id="contacts">
    <h2>Kontaktai</h2>

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
export default {
  name: 'ContactsSection'
}
</script>

<style scoped>
.contacts {
  padding: 60px 20px;
  background: #f9f9f9;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 24px;
  color: #2c3e50;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 460px;
  margin: 0 auto 30px auto;
}

.contact-form input,
.contact-form textarea {
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.contact-form button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.contact-form button:hover {
  background: #369870;
}

.contact-info {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 24px;
  line-height: 1.8;
}

.contact-info a {
  color: #42b983;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.map {
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.map iframe {
  border: 0;
  width: 100%;
  height: 300px;
}

.map small {
  display: block;
  margin-top: 6px;
  font-size: 0.9rem;
  color: #888;
}
</style>
