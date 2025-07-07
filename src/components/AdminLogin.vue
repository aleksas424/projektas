<template>
  <div class="admin-login">
    <h2>Admin prisijungimas</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Vartotojas" required />
      <input type="password" v-model="password" placeholder="Slaptažodis" required />
      <button type="submit">Prisijungti</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p class="register-link">
      Neturi paskyros?
      <a href="#" @click.prevent="goToRegister">Registruotis</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const res = await axios.post('http://localhost:3001/api/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('adminToken', res.data.token);
        this.$emit('login-success');
      } catch (e) {
        this.error = 'Neteisingas vartotojas arba slaptažodis';
      }
    },
    goToRegister() {
      this.$router.push('/adminregister');
    }
  }
}
</script>

<style scoped>
.admin-login {
  max-width: 350px;
  margin: 80px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  text-align: center;
}
.admin-login input {
  width: 100%;
  padding: 10px;
  margin-bottom: 18px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.admin-login button {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.error {
  color: #c00;
  margin-top: 10px;
}
.register-link {
  margin-top: 18px;
  font-size: 0.98em;
}
.register-link a {
  color: #42b983;
  text-decoration: underline;
  cursor: pointer;
}
</style> 