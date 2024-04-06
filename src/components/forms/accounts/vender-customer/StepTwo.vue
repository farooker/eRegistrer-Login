<template>
  <v-row dense>
    <v-col cols="12"><h2>ที่อยู่สำนักงานใหญ่</h2></v-col>
    <v-col cols="12"
      ><AddressInputTH
        tag-desc="(TH)"
        :is-not-team="false"
        :isDisableAddress="false"
        class="pr-5"
        :tax-payer-id-number="props.taxPayerIdNumber"
        :address-item="data_input_head_comp.address_th.location"
        @on-input="handleAddressTH"
    /></v-col>
    <v-col cols="12">
      <!-- <AddressInputEN
        tag-desc="(EN)"
        :is-not-team="false"
        :isDisableAddress="true"
        key-title="name_en"
        class="pr-5"
        :tax-payer-id-number="props.taxPayerIdNumber"
        :address-item="data_input_head_comp.address_en.location"
        @on-input="handleAddressEN"
    /> -->
      <v-card>
        <ManaulAddressInputControl
          class="ma-5"
          :address-item="data_input_head_comp.address_en.location"
          tag-desc="(EN Branch)"
          @on-input="handleAddressEN"
        />
      </v-card>
    </v-col>
    <v-col cols="12"><CountryInput @on-input="handleCountry" /></v-col>
    <v-col cols="12" v-for="(item, index) in props.contactItems" :key="index"
      ><ContactInput
        :index="index"
        :name="item.name"
        :email="item.email"
        :phone="item.phone"
        @on-input="handleContact"
    /></v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from "vue";

import AddressInputTH from "../controls/AddressInput.vue";
// import AddressInputEN from "../controls/AddressInput.vue";
import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";
import CountryInput from "../controls/CountryInput.vue";
import ContactInput from "../controls/ContactInput.vue";

const props = defineProps({
  taxPayerIdNumber: {
    type: String,
    default: "1234567890154",
  },
  addressItem: {
    type: Object,
    default: null,
  },
  addressItemEn: {
    type: Object,
    default: null,
  },
  contactItems: {
    type: Array,
    default: () => [{ index: 0, name: "", email: "", phone: "" }],
  },
});

const emit = defineEmits(["on-input"]);

const data_input_head_comp = ref({
  address_th: {
    location: props.addressItem,
  },
  address_en: {
    location: props.addressItemEn,
  },
  country_info: {},
  contact_info: props.contactItems,
});

const handleAddressTH = (data_obj) => {
  data_input_head_comp.value.address_th = data_obj;
  // data_input_head_comp.value.address_en = data_obj;
};

const handleAddressEN = (data_obj) => {
  data_input_head_comp.value.address_en = data_obj;
};

const handleCountry = (data_obj) => {
  data_input_head_comp.value.country_info = data_obj;
};

const handleContact = (data_obj) => {
  data_input_head_comp.value.contact_info[data_obj.index] = data_obj;
};

watch(
  data_input_head_comp.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true }
);
</script>
