<template>
  <div>
    <AdminLogin v-if="!isLoggedIn" @login-success="onLogin" />
    <AdminPanel v-else @logout="onLogout" />
  </div>
</template>

<script>
import AdminLogin from './AdminLogin.vue';
import AdminPanel from './AdminPanel.vue';

export default {
  name: 'AdminPanelWrapper',
  components: { AdminLogin, AdminPanel },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('adminToken')
    }
  },
  methods: {
    onLogin() {
      this.isLoggedIn = true;
      this.$router.push('/adminpanel');
    },
    onLogout() {
      this.isLoggedIn = false;
      this.$router.push('/adminlogin');
    }
  }
}
</script> 