<template>
  <v-row dense>
    <v-col cols="12" class="mt-n1">
      <v-card-title class="ml-n5">
        <h6>จังหวัด {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.province"
        density="compact"
        :rules="textRequired"
        variant="outlined"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>เขต/อำเภอ {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.district"
        density="compact"
        :rules="textRequired"
        variant="outlined"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>แขวง/ตำบล {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.parish"
        density="compact"
        :rules="textRequired"
        variant="outlined"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>รหัสไปรษณีย์</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.zip_code_value"
        :rules="textRequired"
        density="compact"
        dense
        variant="outlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { useMyAddressStore } from "@/stores/addressDataStore";
import { ref, watch, watchEffect } from "vue";

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const emit = defineEmits(["on-input"]);
const store = useMyAddressStore();

const props = defineProps({
  tagDesc: {
    type: String,
    default: "(EN)",
  },
  addressItem: {
    type: Object,
    default: () => {
      return {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
        zip_code_value: null,
      };
    },
  },
});

const data_input = ref({
  province: props.addressItem.province,
  district: props.addressItem.district,
  parish: props.addressItem.parish,
  zip_code: props.addressItem.zip_code,
  zip_code_value: "",
});

watch(
  () => data_input.value.zip_code_value,
  (newValue) => {
    if (store.postCodes.length > 0) {
      const postCodeFind = store.postCodes.find((el) => el.code == newValue);
      data_input.value.zip_code = postCodeFind?.id ?? "";
      data_input.value.zip_code_value = postCodeFind?.code ?? "";
    }
  }
);

watchEffect(() => {
  data_input.value = props.addressItem;

  if (store.postCodes.length > 0) {
    const postCodeFind = store.postCodes.find(
      (el) => el.subdistrict.id == props.addressItem.zip_code
    );
    data_input.value.zip_code = postCodeFind?.id ?? "";
    data_input.value.zip_code_value = postCodeFind?.code;
  }
});

watch(
  data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: false, immediate: false }
);
</script>
