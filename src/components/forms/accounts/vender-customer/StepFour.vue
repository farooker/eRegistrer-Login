<template>
  <v-row>
    <v-col cols="12"
      ><h2>ข้อมูลเพิ่มเติม {{ props.typeForm }}</h2></v-col
    >
    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Reconcillation acct</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              :items="itemReconcilation"
              item-title="name"
              item-value="id"
              v-model="data_input.more_data_one.reconcliation_acct_seletion"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Instruction Key</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.instruction_key"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Sort Key</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.sort_key"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Check double invoce</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.check_double_invoice"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment methodes</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.payment_methodes"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment term</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.more_data_one.pyment_term_selection"
              :items="itemsPaymentTerms"
              item-title="description"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment terms</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.more_data_one.payment_terms_selection"
              :items="itemsPaymentTerms"
              item-title="description"
              multiple
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding Tax Type (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_type['1']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withholding Tax Code (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.with_tax_code['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Subject to WHT (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.subject_wht['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Type Of Reciepient (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.type_reciepient['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withhold Agent (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_agent['1']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obligation from (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.obli_from['1']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obligation to (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.obli_to['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withholding Tax Type (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_tax_type['2']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withholding Tex Code (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_code['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withhold Agent (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_agent['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obligation from (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              v-model="data_input.more_data_two.obli_from['2']"
              density="compact"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obligation to (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.obli_to['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Withholding Tex Type (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_type['3']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Withholding Tex Code (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_code['3']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Subject WHT (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.subject_wht['3']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
            <v-card-title>
              <h6>Type Of Reciepient (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.type_reciepient['3']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="props.typeForm === AccountType.VENDER">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Purch. Orgamlsation</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.pruch"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Order Currency</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              v-model="data_input.vander_info.order_currency"
              density="compact"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>GR-Base Inv Venf</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.gb_base"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Head Office</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.head_office"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payee in doc</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.pa_yee_in_doc"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { watch } from "vue";
import { ref } from "vue";

import AccountType from "@/utils/enum.util";
import PaymentTermService from "@/apis/PaymentTermService";
import { onMounted } from "vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import AccountReconciliationService from "@/apis/AccountReconciliationService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  typeForm: {
    type: Number,
    default: AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  BusinessPartnerGroup: String,
});

const emit = defineEmits(["on-input"]);

const itemReconcilation = ref([]);
const itemsPaymentTerms = ref([]);
const itemsAccountBusinessPartnerType = ref([]);

onMounted(async () => {
  await getPaymentTerm();
  await getAccountReconciliation();
  itemsAccountBusinessPartnerType.value = [
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
  ];
});

const getAccountReconciliation = async () => {
  try {
    const response =
      await AccountReconciliationService.getAccountReconciliationAll();
    if (response.data?.is_success) {
      itemReconcilation.value = response.data.data;
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

const data_input = ref({
  more_data_one: {
    reconcliation_acct_seletion: null,
    instruction_key: "4",
    sort_key: "009",
    check_double_invoice: "x",
    payment_methodes: null,
    pyment_term_selection: null,
    payment_terms_selection: [],
  },
  more_data_two: {
    subject_wht: {
      1: null,
      2: null,
      3: null,
    },
    type_reciepient: {
      1: null,
      2: null,
      3: null,
    },
    with_tax_type: {
      1: null,
      2: null,
      3: null,
    },
    with_tax_code: {
      1: null,
      2: null,
      3: null,
    },
    with_agent: {
      1: null,
      2: null,
    },
    obli_from: {
      1: null,
      2: null,
    },
    obli_to: {
      1: null,
      2: null,
    },
  },
  vander_info: {
    pruch: null,
    gb_base: null,
    order_currency: null,
    head_office: null,
    pa_yee_in_doc: null,
  },
});

watch(
  () => props.BusinessPartnerGroup,
  (newValue) => {
    const itemFind = itemsAccountBusinessPartnerType.value.find(
      (el) => el.id == newValue
    );
    if (itemFind) {
      if (props.typeForm === AccountType.VENDER) {
        switch (itemFind.code) {
          case "BP04":
            data_input.value.more_data_two.with_tax_type["1"] = "04";
            data_input.value.more_data_two.with_tax_type["2"] = "05";
            data_input.value.more_data_two.with_tax_type["3"] = "06";

            data_input.value.more_data_two.type_reciepient["1"] = "03";
            data_input.value.more_data_two.type_reciepient["2"] = "03";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
          case "BP05":
            data_input.value.more_data_two.with_tax_type["2"] = null;
            data_input.value.more_data_two.with_tax_type["1"] = null;
            data_input.value.more_data_two.subject_wht["1"] = null;
            data_input.value.more_data_two.subject_wht["2"] = null;
            data_input.value.more_data_two.subject_wht["3"] = null;
            data_input.value.more_data_two.with_tax_type["3"] = null;
            data_input.value.more_data_two.subject_wht["1"] = null;
            data_input.value.more_data_two.subject_wht["2"] = null;
            data_input.value.more_data_two.subject_wht["3"] = null;
            break;
          case "0001":
            data_input.value.more_data_two.with_tax_type["3"] = "15";
            data_input.value.more_data_two.with_tax_type["1"] = "13";
            data_input.value.more_data_two.with_tax_type["2"] = "14";
            data_input.value.more_data_two.type_reciepient["2"] = "03";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
          case "0002":
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
          case "0003":
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
          case "0004":
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
          default:
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            break;
        }
      } else {
        switch (itemFind.code) {
          case "0001":
            data_input.value.more_data_two.with_agent["1"] = null;
            data_input.value.more_data_two.obli_from["1"] = null;
            data_input.value.more_data_two.obli_to["1"] = null;

            data_input.value.more_data_two.with_tax_type["1"] = null;
            data_input.value.more_data_two.with_tax_type["2"] = null;
            break;
          case "0002":
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.obli_from["1"] = "01.01.1900";
            data_input.value.more_data_two.obli_to["1"] = "31.12.9999";
            data_input.value.more_data_two.with_tax_type["1"] = null;
            data_input.value.more_data_two.with_tax_type["2"] = "R1";
            break;
          case "0003":
            data_input.value.more_data_two.with_tax_type["1"] = null;
            data_input.value.more_data_two.with_tax_type["2"] = "R2";
            break;
          case "0004":
            data_input.value.more_data_two.with_tax_type["1"] = null;
            data_input.value.more_data_two.with_tax_type["2"] = "R3";
            break;
          default:
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.obli_from["1"] = "01.01.1900";
            data_input.value.more_data_two.obli_to["1"] = "31.12.999";
            break;
        }
      }
    }
  }
);

// data_input.value.more_data_two.with_tax_type.one = computed(() => {
//   const itemFind = itemsAccountBusinessPartnerType.value.find(
//     (el) => el.id == props.BusinessPartnerGroup
//   );
//   if (itemFind) {
//     switch (itemFind.code) {
//       case "BP04":
//         return "04";
//       case "BP05":
//         return null;
//       case "0001":
//         return "13";
//       case "0002":
//         return "16";
//       case "0003":
//         return "16";
//       case "0004":
//         return "16";
//       default:
//         return null;
//     }
//   }
//   return null;
// });

const getPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.getPaymentTermAll();
    if (response.data?.is_success) {
      itemsPaymentTerms.value = response.data.data;
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

watch(data_input.value, (newValue) => {
  emit("on-input", newValue);
});
</script>
