<template>
  <v-container>
    <v-form ref="registreForm">
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
                :rules="textRequired"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col><h2>รหัสผ่าน</h2></v-col>
            <v-col cols="12">
              <v-text-field
                variant="solo-filled"
                :rules="textRequired"
                v-model="Form.Password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-checkbox
                label="แสดงรหัสผ่าน"
                v-model="Form.CheckPass"
              ></v-checkbox>
            </v-col>

            <v-col cols="4" class="pa-6 ma-0">
              <v-btn
                variant="text"
                @click="handleForgetPassword"
                class="custom-underline"
                ><h4>ลืมรหัสผ่าน</h4>
              </v-btn>
            </v-col>
          </v-row>

          <v-row
            class="text-center pa-5 ma-0"
            dense
            justify="center"
            align="center"
          >
            <v-col cols="12">
              <v-btn
                size="x-large"
                @click="handleLoginClicked"
                block
                class="text-capitalize rounded-pill"
                color="red"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-form>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
const Form = ref({
  Email: "",
  Password: "",
});
const registreForm = ref(null);
const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const emit = defineEmits(["on-forget-password", "on-clicked-login"]);

const handleForgetPassword = () => {
  emit("on-forget-password");
};

const handleLoginClicked = async () => {
  const is_valid = await registreForm.value.validate();
  if (!is_valid || !is_valid["valid"]) return;
  emit("on-clicked-login", Form.value);
};
</script>
<style>
.custom-underline {
  text-decoration: underline;
  color: black;
}
</style>
