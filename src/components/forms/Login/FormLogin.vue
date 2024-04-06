<template>
  <v-container>
    <v-card
      class="pa-7"
      border="outlined"
      style="border-radius: 20px"
      width="700"
      height="900"
    >
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
            <v-img
              style="max-width: 200px"
              class="mt-5"
              src="/frasers.png"
            ></v-img>
          </v-col>
        </v-row>

        <div class="text-center mt-5 pa-5 ma-5">
          <h1>Supplier Qualification System</h1>
          <h1>เข้าสู่ระบบ</h1>
        </div>
        <v-row no-gutters>
          <v-col><h2>อีเมล</h2></v-col>

          <v-col cols="12">
            <v-text-field
              variant="solo-filled"
              v-model="Form.Email"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col><h2>รหัสผ่าน</h2></v-col>
          <v-col cols="12">
            <v-text-field
              variant="solo-filled"
              v-model="Form.NewPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row >
          <v-col cols="8">
            <v-checkbox
              label="แสดงรหัสผ่าน"
              v-model="Form.CheckPass"
            ></v-checkbox>
            <!-- <h4>แสดงรหัสผ่าน</h4> -->
          </v-col>

        <v-col cols="4" class="pa-6 ma-0">
          <v-btn variant="text" class="custom-underline"><h4>ลืมรหัสผ่าน</h4> </v-btn>
          <!-- <h4>แสดงรหัสผ่าน</h4> -->
        </v-col>
         </v-row>

        <v-row
          class="text-center pa-5 ma-0"
          dense
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <!-- Set cols to 12 to take up the full width of the row -->
            <v-btn
              size="x-large"
              to="/BusinessPartner/CreateBusinessPartner"
              block
              class="text-capitalize rounded-pill"
              color="red"
            >
              <!-- <v-icon>mdi-plus</v-icon> -->
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
const Form = ref({
  Email: "",
  NewPassword: "",
  ConPassword: "",
  CheckPass: "",
});
</script>
<style>
.custom-underline {
  text-decoration: underline;
  /* เพิ่มสีที่คุณต้องการ */
  color: black;
}
</style>
