<template>
  <v-row dense>
    <v-col cols="12"><h2>ที่อยู่สาขา</h2></v-col>
    <v-col cols="12">
      <v-card>
        <v-row dense no-gutters>
          <v-col cols="12">
            <v-card-title>
              <h6>Branch Code</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.branch_code"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Branch Description</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.branch_desc"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="12" v-if="props.typeForm === AccountType.CUSTOMER">
            <v-card-title>
              <h6>Default Branch Code</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.default_branch_code"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col> -->

          <v-col cols="12">
            <v-card-title>
              <h6>Search Team 1 (TH Branch)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.serach_team.th"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Search Team 1 (EN Branch)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.serach_team.en"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12"
      ><AddressInputTH
        class="pr-6"
        tag-desc="(TH Branch)"
        :is-not-team="true"
        :isDisableAddress="false"
        :address-item="props.addressItem"
        @on-input="handleAddressTH"
    /></v-col>
    <v-col cols="12">
      <!-- <AddressInputEN
        class="pr-6"
        tag-desc="(EN Branch)"
        :is-not-team="true"
        :isDisableAddress="true"
        key-title="name_en"
        :address-item="data_input_head_comp_branch.address_en.location"
        @on-input="handleAddressEN"
    /> -->
      <v-card>
        <ManaulAddressInputControl
          :address-item="data_input_head_comp_branch.address_en.location"
          class="ma-5"
          tag-desc="(EN Branch)"
          @on-input="handleAddressEN"
        />
      </v-card>
    </v-col>
    <v-col cols="12"><CountryInput /></v-col>
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
import { ref } from "vue";
import { watch } from "vue";

import AddressInputTH from "../controls/AddressInput.vue";
// import AddressInputEN from "../controls/AddressInput.vue";
import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";
import CountryInput from "../controls/CountryInput.vue";
import ContactInput from "../controls/ContactInput.vue";
import AccountType from "@/utils/enum.util";
import { onMounted } from "vue";

const props = defineProps({
  typeForm: {
    type: Number,
    default: AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  branchCode: {
    type: String,
    default: "00000",
  },
  barnchDesc: {
    type: String,
    default: "Brach name",
  },
  addressItem: {
    type: Object,
    default: null,
  },
  contactItems: {
    type: Array,
    default: () => [{ index: 0, name: "", email: "", phone: "" }],
  },
  addressItemEn: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["on-input"]);

const data_input_head_comp_branch = ref({
  address_th: {
    location: props.addressItem,
  },
  address_en: {
    location: props.addressItemEn,
  },
  info: {
    branch_code: props.branchCode,
    branch_desc:
      props.branchCode === "00000" ? "สำนักงานใหญ่" : props.barnchDesc,
    default_branch_code: "",
    serach_team: {
      th: props.branchCode === "00000" ? "สำนักงานใหญ่" : props.barnchDesc,
      en: props.branchCode === "00000" ? "Head office" : props.barnchDesc,
    },
  },
  contacts: [],
});

onMounted(() => {
  emit("on-input", data_input_head_comp_branch.value);
});

const handleAddressTH = (data_obj) => {
  data_input_head_comp_branch.value.address_th = data_obj;
  // data_input_head_comp_branch.value.address_en = data_obj;
};

const handleAddressEN = (data_obj) => {
  data_input_head_comp_branch.value.address_en = data_obj;
};

const handleContact = (data_obj) => {
  data_input_head_comp_branch.value.contacts[data_obj.index] = data_obj;
};

watch(data_input_head_comp_branch.value, (newValue) => {
  emit("on-input", newValue);
});
</script>
