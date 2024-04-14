<template>
  <div style="background-color: lightgrey">
    <v-row align="center">
      <v-col cols="6">
        <v-row no-gutters>
          <v-col
            class="d-flex"
            cols="12"
            style="
              height: 100vh;
              background-image: url('/BG2-02.png');
              background-size: cover;
              background-position: center;
            "
          >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <FormRegister
          class="d-flex justify-center"
          @on-register="handleRegisterByEmail"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { ref } from "vue";
import FormRegister from "@/components/forms/Login/FormRegister.vue";

import { useRouter } from "vue-router";
const router = useRouter();

// const registreForm = ref(null)
const dataInputRegister = ref({
  Email: "",
  NewPassword: "",
  ConPassword: "",
});

const handleRegisterByEmail = async (newValue) => {
  dataInputRegister.value = newValue;
  localStorage.setItem(
    "temp_new_register",
    dataInputRegister.value.ConPassword
  );
  router.push({
    name: "SignUpOtpPage",
    query: { email: dataInputRegister.value.Email },
  });
};
</script>

<style scoped>
/* .imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
} */
</style>
