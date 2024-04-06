<template>
  <v-row>
    <v-col cols="12"><h2>ข้อมูลคู่ค้า</h2></v-col>
    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Business Partner</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Vender Number</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.vender_number"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Business Partner Group</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.main_data.business_partner_gruop_selection"
              :items="displayItemsBusinessPartnerGroup"
              item-title="displayName"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Business partner category</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner_catega"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Partner Role</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner_role"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>BP Type</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.main_data.bp_type_selection"
              :items="itemsAccountBusinessPartnerType"
              item-title="name"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Natural Person</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.naturel_person"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax Categoly</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tax_catega"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax Number</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tax_number"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax Type</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.main_data.tax_type_selection"
              :items="taxType"
              item-title="title"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Industry</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.indutry"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Trading Partner</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tarding_partner"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Valid From</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.valid_from"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Valid To</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.valid_to"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Company Code</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.other.company_code"
              :items="itemsCompany"
              item-title="displayName"
              item-value="id"
              density="compact"
              multiple
              chips
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank Country</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_country"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank Key</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.other.bank_key"
              :items="itemsBank"
              item-title="bank_key"
              item-value="bank_key"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank Branch</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_branch"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank Account</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_account"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Account Holder</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_key"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import CompnayService from "@/apis/CompnayService";
import OtherService from "@/apis/OtherService";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted, defineProps } from "vue";
import { computed, watch, ref } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  isNaturePerson: {
    type: Boolean,
    default: true,
  },
  isBusinessPartnerTypeId: {
    type: String,
    default: null,
  },
  isRegisteredVat: {
    type: Boolean,
    default: false,
  },
  bankInfoObj: {
    type: Object,
    default: () => {
      return {
        acc_name_en: "Acc Name",
        bank_name: "Bank Name",
        bank_branch: "Bank Branch",
        acc_number: "Acc Number",
        bank_key: "",
      };
    },
  },
  taxCetagory: {
    type: String,
  },
  companyIdSelect: {
    type: Array,
  },
});

const emit = defineEmits(["on-input"]);

const taxType = [
  { id: "01", title: "VAT" },
  { id: "02", title: "NO VAT" },
];

const data_input = ref({
  main_data: {
    business_partner: null,
    vender_number: null,
    business_partner_gruop_selection: null,
    business_partner_catega: "2",
    business_partner_role: "FLVN00X",
    bp_type_selection: props.isBusinessPartnerTypeId,
    naturel_person: props.isNaturePerson ? "X" : null,
    tax_catega: props.taxCetagory,
    tax_number: "1463758425707",
    tax_type_selection: props.isRegisteredVat ? "01" : "02",
    indutry: null,
    tarding_partner: null,
    valid_from: "01.01.1900",
    valid_to: "32.12.9999",
  },
  other: {
    company_code: props.companyIdSelect,
    bank_country: "TH",
    bank_key: props.bankInfoObj?.bank_key,
    bank_branch: props.bankInfoObj?.bank_branch,
    bank_account: props.bankInfoObj?.acc_number,
  },
});

const displayItemsBusinessPartnerGroup = computed(() => {
  return itemsBusinessPartnerGroup.value.map((item) => ({
    ...item,
    displayName: `${item.code} - ${item.name}`,
  }));
});

// get-account-business-partner-types -> /v1/master/get-account-business-partner-types SONG API
const itemsAccountBusinessPartnerType = ref([
  {
    id: "4",
    code: "0004",
    name: "Embassy",
  },
  {
    id: "3",
    code: "0003",
    name: "Government",
  },
  {
    id: "2",
    code: "0002",
    name: "Corporate",
  },
  {
    id: "1",
    code: "0001",
    name: "Person/ Group of Person",
  },
]);

onMounted(async () => {
  await getBusinessPartnerGroupAll();
  await getCompanies();
  await getBanks();
  emit("on-input", data_input.value);
});

const itemsCompany = ref([]);
const itemsBank = ref([]);
const itemsBusinessPartnerGroup = ref([]);

const getBusinessPartnerGroupAll = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerGroupAll();
    if (response.data?.is_success) {
      itemsBusinessPartnerGroup.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getCompanies = async () => {
  try {
    const response = await CompnayService.getCompanyAll();
    if (response.data?.is_success) {
      itemsCompany.value = response.data.data.map((item) => ({
        ...item,
        displayName: `${item.company_code} - ${item.name_th}`,
      }));
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getBanks = async () => {
  try {
    const response = await OtherService.getBanksAll();
    if (response.data?.is_success) {
      itemsBank.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

watch(
  data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true }
);
</script>
