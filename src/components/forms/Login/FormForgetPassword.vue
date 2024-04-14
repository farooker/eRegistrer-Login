<template>
  <v-container>
    <v-card class="pa-7" border="outlined" style="border-radius: 20px" width="700" height="900">
      <v-form v-model="validateForm">
        <v-card-item dense>
          <v-row>
            <v-col class="d-flex justify-center">
              <!-- <v-img
              aspect-ratio="16/9"
              cover
              prepend-icon="mdi mdi-information-outline"
                width="100"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> -->
              <v-img style="max-width: 200px" class="mt-5" src="/frasers.png"></v-img>
            </v-col>
          </v-row>

          <div class="text-center mt-5 pa-5 ma-5">
            <h1>Supplier Qualification System</h1>
            <v-card-title>
              <h3>ลืมรหัสผ่าน</h3>
            </v-card-title>
          </div>
          <div class="text-center mt-5 pa-5 ma-5">
            <v-card-title>
              <h3>ระบบจะทำการส่ง Email ไปยัง</h3>
            </v-card-title>

          </div>

          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field v-model="email" variant="outlined" placeholder="Email" :rules="rulesValid.email"></v-text-field>
            </v-col>
          </v-row>

          <div v-if="sendAgain" class="text-center mt-0 pa-5 ma-5">
            <span class="underline-on-hover  text-secondary">
              ระบบทำการส่งอีเมลให้อีกครั้งแล้ว
            </span>
          </div>
          <v-row class="text-center pa-0 ma-0" dense justify="center" align="center">
            <v-col cols="12">
              <v-btn size="x-large" block class="text-capitalize rounded-pill" color="secondary" :disabled="loading"
                :loading="loading" @click="sendEmail">
                {{ sendAgain ? 'ส่งใหม่อีกครั้ง' : 'ยืนยัน' }}
              </v-btn>
            </v-col>
          </v-row>
          <div class="text-center mt-0 pa-5 ma-5">

            <span>กรุณาคลิก Link ในอีเมล เพื่อทำการตั้งรหัสใหม่</span>

          </div>

        </v-card-item>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
//import { useRouter } from 'vue-router';
import verifyService from '@/apis/VerifyService';

import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();

const email = ref(null);
const loading = ref(false);
const sendAgain = ref(false);
const validateForm = ref(null);
const rulesValid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || "email ไม่ถูกต้อง",
  ],
})

const sendEmail = async () => {
  if (validateForm.value) {
    try {
      loading.value = true;
      const response = await verifyService.forgetPassword(email.value);
      if (response.data?.is_success) {
        sendAgain.value = true
      }
    } catch (e) {
      if (e.response) {
        const val = e.response?.data
        handlingErrorsMessage(val.message, val.data?.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value = false;
    }
  }
};

</script>
