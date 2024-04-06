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
 import Login from '@/views/Login/LoginPage.vue'
 import NewPassword from '@/views/Login/NewPassword.vue'
 import LoginOtpPage from '@/views/Login/LoginOtpPage.vue'
 import EmployeeLogin from '@/views/Login/EmployeeLogin.vue'
</script>
