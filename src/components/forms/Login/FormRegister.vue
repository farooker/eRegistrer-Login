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
            <h1>การสร้างบัญชี</h1>
          </div>
          <v-row no-gutters>
            <v-col><h2>อีเมล</h2></v-col>

            <v-col cols="12">
              <v-text-field
                variant="solo-filled"
                v-model="Form.Email"
                bg-color="gray"
                :rules="textRequired"
              ></v-text-field>
            </v-col>

            <v-col><h2>สร้างรหัสผ่านใหม่</h2></v-col>
            <v-col cols="12">
              <v-text-field
                variant="solo-filled"
                placeholder="สร้างรหัสผ่านใหม่"
                v-model="Form.NewPassword"
                bg-color="gray"
                :rules="textRequired"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                variant="solo-filled"
                placeholder="ยืนยันรหัสผ่านใหม่"
                v-model="Form.ConPassword"
                bg-color="gray"
                :rules="textRequired"
              ></v-text-field>
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
                block
                class="text-capitalize rounded-pill"
                color="red"
                @click="handleRegister"
              >
                สร้างบัญชี
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-form>
  </v-container>
</template>
<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  email: String,
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const registreForm = ref(null);
const Form = ref({
  Email: "",
  NewPassword: "",
  ConPassword: "",
});

const emit = defineEmits(["on-register"]);

const handleRegister = async () => {
  const is_valid = await registreForm.value.validate();
  if (!is_valid || !is_valid["valid"]) return;
  emit("on-register", Form.value);
};

watchEffect(() => {
  Form.value.Email = props.email;
});
</script>

<style>
.custom-underline {
  text-decoration: underline;
  color: black;
}
</style>
