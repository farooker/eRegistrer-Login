<template>
  <v-card>
    <v-row dense>
      <v-col cols="12">
        <v-card-title>
          <h6>Name 1 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.name.one"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Name 2 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.name.two"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Name 3 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.name.three"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Name 4 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.name.four"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7" v-if="!props.isNotTeam">
        <v-card-title>
          <h6>Search Team 1 (ชื่อย่อ)</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.search.one"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7" v-if="!props.isNotTeam">
        <v-card-title>
          <h6>Search Team 2 (เลข 13 หลัก)</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.search.two"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Address 1 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.address.one"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Address 2 {{ props.tagDesc }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-0"
          density="compact"
          dense
          v-model="data_input.address.two"
          variant="outlined"
        ></v-text-field>
      </v-col>
        {{  }}
      <v-col cols="12">
        <AddressInputControl
          :tag-desc="props.tagDesc"
          :key-value="props.keyValue"
          :key-title="props.keyTitle"
          :is-disable-address="props.isDisableAddress"
          :address-item="props.addressItem"
          @on-input="handleAddressInput"
          class="ml-5"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, defineProps, watch, onMounted, watchEffect } from "vue";
import AddressInputControl from "@/components/controls/AddressInputControl.vue";

const emit = defineEmits(["on-input"]);

const props = defineProps({
  taxPayerIdNumber: {
    type: String,
    default: "",
  },
  tagDesc: {
    type: String,
    default: "(TH)",
  },
  keyValue: {
    type: String,
    default: "id",
  },
  keyTitle: {
    type: String,
    default: "name_th",
  },

  isNotTeam: {
    type: Boolean,
    default: false,
  },
  isDisableAddress: {
    type: Boolean,
    default: false,
  },
  addressItem: {
    type: Object,
    default: () => {
      return {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      };
    },
  },
});
const data_input = ref({
  name: {
    one: "",
    two: "",
    three: "",
    four: "",
  },
  search: {
    one: "",
    two: "",
  },
  address: {
    one: "",
    two: "",
  },
  location: props.addressItem,
});

watchEffect(() => {
  data_input.value.search.two = props.taxPayerIdNumber;
  data_input.value.location = props.addressItem;
});

onMounted(() => {
  emit("on-input", data_input.value);
});

watch(
  () => data_input.value,
  () => {
    emit("on-input", data_input.value);
  },
  { deep: true }
);

const handleAddressInput = (newValue) => {
  data_input.value.location = newValue;
};
</script>
