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
            <h3>รหัสจะหมดอายุภายใน ({{ formattedTime }}) นาที</h3>
          </v-card-title>
        </div>

        <v-row dense justify="center" align="center">
          <v-col cols="6" class="d-flex align-center">
            <v-otp-input length="6" v-model="data_input"></v-otp-input>
          </v-col>
        </v-row>
        <div class="text-center mt-5 pa-5 ma-5">
          <span>ref.code: {{ props.refCode }}</span>
        </div>

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
              :disabled="isDisabled"
              class="text-capitalize rounded-pill"
              color="black"
              @click="handleVertifyOTP"
            >
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
import { String } from "core-js";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  refCode: String,
  exp: String,
  expiredSeconds: Number,
});

const counter = ref({
  dateExp: "",
  secord: 300,
});
const data_input = ref("");
const timeLeft = ref("");

const emit = defineEmits(["on-vertify"]);

const handleVertifyOTP = () => {
  emit("on-vertify", data_input.value);
};

const sendEmailAgain = () => {
  console.log("Send email again clicked");
};

const isDisabled = computed(() => {
  if (data_input.value.length === 6) return false;
  return true;
});

function updateTimer() {
  const endDate =
    new Date(counter.value.dateExp).getTime() + counter.value.secord * 1000;

  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance < 0) {
    clearInterval(interval);
    timeLeft.value = "Time's up!";
  } else {
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft.value = minutes + "m " + seconds + "s ";
  }
}
const interval = setInterval(updateTimer, 1000);

/******************************** */
const totalSeconds = ref(counter.value.secord);
const formattedTime = ref("05:00");

// Format the time from total seconds to mm:ss
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    minutes.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  );
};

const updateTimers = () => {
  if (totalSeconds.value > 0) {
    setTimeout(() => {
      totalSeconds.value--;
      formattedTime.value = formatTime(totalSeconds.value);
      updateTimers();
    }, 1000);
  } else {
    formattedTime.value = "Time's up!";
  }
};

onMounted(() => {
  counter.value.dateExp = props.exp;
  counter.value.secord = props.expiredSeconds;
  // updateTimer();
  updateTimers();
});
</script>
<style>
.custom-underline {
  text-decoration: underline;
  color: black;
}

.underline-on-hover a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
