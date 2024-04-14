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
              background-image: url('/otp01.png');
              background-size: cover;
              background-position: center;
            "
          >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <FormInputOtp
          :refCode="itemOTP.reference_code"
          :exp="itemOTP.expired_at"
          :expired-seconds="itemOTP.expired_seconds"
          class="d-flex justify-center"
          @on-vertify="handleVertifyOTP"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import FormInputOtp from "@/components/forms/Login/FormInputOtp.vue";
import VerifyService from "@/apis/VerifyService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const email = route.query.email;

const dataInputOTPVertify = ref();
const itemOTP = ref({});

onMounted(async () => {
  await getOptByEmail();
});

const handleVertifyOTP = async (newValue) => {
  dataInputOTPVertify.value = newValue;
  if (dataInputOTPVertify.value) await vertifyOtpCode();
};

const getOptByEmail = async () => {
  try {
    const response = await VerifyService.getOTP(email, "signup");
    if (response.data?.is_success) {
      itemOTP.value = response.data.data;
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

const vertifyOtpCode = async () => {
  try {
    const response = await VerifyService.getVertifyOTP(
      dataInputOTPVertify.value,
      itemOTP.value.reference_code
    );
    if (response.data?.is_success) {
      await login();
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

const login = async () => {
  try {
    const response = await VerifyService.login(
      email,
      localStorage.getItem("temp_new_register")
    );
    if (response.data?.is_success) {
      // await getAutorization();
      router.push('/Authorization');
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

// const getAutorization = async () => {
//   try {
//     const response = await VerifyService.getAuthrization(email);
//     if (response.data?.is_success) {
//       localStorage.setItem("temp_autherization", email);
//       localStorage.removeItem("temp_new_register");
//     }
//   } catch (e) {
//     if (e.response) {
//       const val = e.response.data;
//       handlingErrorsMessage(val.message, val?.data.error);
//       return;
//     }
//     handlingErrorsMessage("unknown", e.message);
//   }
// };
</script>

<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
