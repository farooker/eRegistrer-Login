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
          <v-card-title>
            <h3>กรอกรหัสยืนยัน</h3>
          </v-card-title>
        </div>
        <div class="text-center mt-5 pa-5 ma-5">
          <v-card-title>
            <h3>กรุณากรอกรหัสยืนยันตัวตนที่ส่งให้ทางอีเมล</h3>
          </v-card-title>
          <v-card-title>
            <h3>รหัสจะหมดอายุภายใน (05.00) นาที</h3>
          </v-card-title>
        </div>

        <v-row dense justify="center" align="center">
          <v-col cols="6" class="d-flex align-center">
            <ThaiIdInputControl class="mt-5" @on-input="handleThaiId" />
          </v-col>
        </v-row>
        <div class="text-center mt-5 pa-5 ma-5">

            <span>ref.code:1234</span>

        </div>

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
              disabled
              class="text-capitalize rounded-pill"
              color="black"
            >
              <!-- <v-icon>mdi-plus</v-icon> -->
              ยืนยัน
            </v-btn>
          </v-col>
        </v-row>

  <div class="text-center mt-5 pa-5 ma-5">
    <span class="underline-on-hover">
      ไม่ได้รับอีเมล? <a @click="sendEmailAgain">ส่งอีเมลให้อีกครั้ง</a>
    </span>
  </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
import { watch, ref } from "vue";
import ThaiIdInputControl from "../../controls/OtpInputControl";
// const Form = ref({
//   Email: "",
//   NewPassword: "",
//   ConPassword: "",
//   CheckPass: "",
// });
const data_input = ref({
  type_register: null,
  type_data: null,
  company_data: {
    is_other: false,
    data: null,
    other: null,
  },
});
watch(data_input.value, (newValue) => {
  console.log(JSON.stringify(newValue));
});

const handleThaiId = (id) => {
  data_input.value.thai_people_id = id;
};

const sendEmailAgain = () => {
      // ทำงานเมื่อคลิกที่ลิงก์ "ส่งอีเมลให้อีกครั้ง"
      console.log("Send email again clicked");
      // ทำการส่งอีเมลอีกครั้ง
};

</script>
<style>
.custom-underline {
  text-decoration: underline;
  /* เพิ่มสีที่คุณต้องการ */
  color: black;
}

.underline-on-hover a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
