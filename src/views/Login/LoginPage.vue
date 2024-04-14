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
        <FormLogin
          class="d-flex justify-center"
          @on-forget-password="handleForgetPassword"
          @on-clicked-login="handleLoginClicked"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import FormLogin from "@/components/forms/Login/FormLogin.vue";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

import { useRouter } from "vue-router";
import VerifyService from "@/apis/VerifyService";
const router = useRouter();
import { useRoute } from "vue-router";

const route = useRoute();
const dataInput = ref({
  Email: "",
  Password: "",
});

const email = route.query.email;
const code = route.query.code;

const handleForgetPassword = () => {
  router.push({
    name: "ForgetPasswordPage",
  });
};

onMounted(async () => {
  if (email && code) await handleVertifyUrl();
});

const handleVertifyUrl = async () => {
  try {
    const response = await VerifyService.verifyUrl(email, code);
    if (response.data?.is_success) {
      await checkedUserExits();
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.status;
      if (val == 400) {
        router.push({
          name: "ErrorPage",
          query: { err: "EXP_FORM" }
        });
      }

      if (val == 404) {
        router.push({
          name: "ErrorPage",
          query: { err: "NOT_FOUND" }
        });
      }
    }
  }
};

const checkedUserExits = async () => {
  try {
    await VerifyService.checkExistingUsernam(email);
  } catch (e) {
    const val = e.response.status;
    if (val == 404) {
      router.push({
        name: "SignUpPage",
      });
    }
  }
};

const handleLoginClicked = async (dataInputLogin) => {
  try {
    dataInput.value = dataInputLogin;
    const response = await VerifyService.login(
      dataInput.value.Email,
      dataInput.value.Password
    );
    if (response.data?.is_success) {
      localStorage.setItem("temp_new_register", dataInput.value.Password);
      router.push({
        name: "LoginOtpPage",
        query: { email: dataInput.value.Email },
      });
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};
</script>

<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
