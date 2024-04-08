<template>
  <!-- <v-container fluid> -->
  <div style="background-color: lightgrey;">
  <v-row align="center">
    <v-col cols="5">
      <v-row no-gutters>
        <v-col
          class="d-flex"
          cols="12"
          style="
            height: 100vh;
            background-image: url('/otp01.png');
            background-size: cover;
            background-position: center;
          "
        >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <FormForgetPassword class="d-flex justify-center"/>
    </v-col>
  </v-row>
  <!-- <FormLogin /> -->
  <!-- </v-container> -->
  </div>
</template>
<script setup>
// import { ref, onBeforeMount,computed } from 'vue';
import FormForgetPassword from "@/components/forms/Login/FormForgetPassword.vue";
</script>
<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>

