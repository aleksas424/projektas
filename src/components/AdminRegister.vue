<template>
  <div class="admin-register">
    <h2>Sukurti naują admin</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Vartotojas" required />
      <input type="password" v-model="password" placeholder="Slaptažodis" required />
      <button type="submit">Registruoti</button>
      <p v-if="msg" :style="{color: msgColor}">{{ msg }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminRegister',
  data() {
    return {
      username: '',
      password: '',
      msg: '',
      msgColor: 'red'
    }
  },
  methods: {
    async register() {
      this.msg = '';
      try {
        await axios.post('http://localhost:3001/api/register', {
          username: this.username,
          password: this.password
        });
        this.msg = 'Admin sukurtas sėkmingai!';
        this.msgColor = 'green';
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          this.msg = e.response.data.message;
        } else {
          this.msg = 'Klaida registruojant';
        }
        this.msgColor = 'red';
      }
    }
  }
}
</script>

<style scoped>
.admin-register {
  max-width: 350px;
  margin: 80px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  text-align: center;
}
.admin-register input {
  width: 100%;
  padding: 10px;
  margin-bottom: 18px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.admin-register button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
</style> 