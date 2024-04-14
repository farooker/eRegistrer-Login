<template>
<!-- <Login /> -->
  <!-- <NewPassword /> -->
  <!-- <LoginOtpPage /> -->
  <!-- <EmployeeLogin /> -->
  <router-view />
</template>
<style lang="scss">
  @import "../src/styles/main.scss";
</style>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted,watch } from 'vue';

// import { useRouter } from 'vue-router';
// const router = useRouter();

// import { useSessionInfoStore } from "@/stores/sessionInfoStore";
// const store = useSessionInfoStore();
//  import Login from '@/views/Login/LoginPage.vue'
//  import NewPassword from '@/views/Login/NewPassword.vue'
//  import LoginOtpPage from '@/views/Login/LoginOtpPage.vue'
//  import EmployeeLogin from '@/views/Login/EmployeeLogin.vue'

// watch(() => store.sessionInfo,(newValue) => {
//     console.log('info =>'+newValue)
//     //router.push('/');
//   }
// );

// onMounted(async () => {
//   await store.getAuthenInfo('email@gmail.com');
// });
</script>
