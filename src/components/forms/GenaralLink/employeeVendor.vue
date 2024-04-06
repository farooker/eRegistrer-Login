<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12" class="pa-2">
        <v-card>
          <v-card-title>
            <h5>สำหรับบริษัท</h5>
          </v-card-title>
          <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-select
                class="ml-6 mr-6"
                chips
                v-model="data_input.company_data.data"
                :items="selected_items.items_company_data"
                item-value="id"
                multiple
                :rules="rules_valid.companyData"
                item-title="name_th"
                placeholder="เลือกคำตอบ"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="pa-2">
        <v-card>
          <v-card-title>
            <h5>กรณีพนักงานต้องเลือกอย่างน้อย 1 ประเภท</h5>
          </v-card-title>
           <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-checkbox
                v-for="(item, index) in selected_items.items_employee_type"
                :key="index"
                :rules="rules_valid.role"
                v-model="data_input.employee_data.data[index]"
                class="ml-6 d-flex"
                :value="item.id"
                :label="item.name_th"
              ></v-checkbox>
              <!-- {{ selected_items.items_employee_type }} -->
            </v-col>
          </v-row>
            </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" class="pa-2">
        <v-card>
          <v-card-title>
            <h5>Payment Terms</h5>
          </v-card-title>
          <v-card-text>
          <v-card-text>
            <v-row dense class="mt-">
              <v-col cols="12">
                <v-radio-group
                  color="red"
                  class="ml-6 d-flex"
                  v-model="data_input.term_data.data">
                  <v-radio
                    v-for="(item, index) in selected_items.items_payment_terms"
                    :label="item.description"
                    :key="index"
                    :value="item.id"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" class="ml-6 d-flex flex-row">
                <v-radio-group style="width: auto" color="red">
                  <v-radio label="อื่นๆ"></v-radio>
                </v-radio-group>
                <v-text-field
                  class="mr-12"
                  style="margin-left: -1100px"
                  density="compact"
                  dense
                  variant="outlined"
                  v-model="data_input.term_data.other"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12" class="d-flex justify-center">
      <ButtonControl
        text="ต่อไป"
        @button-clicked="emit('on-to-company-profile')"
      />
    </v-col>
  </v-form>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import ButtonControl from "@/components/controls/ButtonLink.vue";
import compnayService from "@/apis/CompnayService";
import EmployeeType from "@/apis/EmployeeTypeService";
import PaymentTermService from "@/apis/PaymentTermService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const emit = defineEmits(["form-update", "on-to-company-profile"]);
const data_input = ref({
  company_data: {
    is_other: false,
    data: [],
    other: null,
  },
  employee_data: {
    is_other: false,
    data: [],
    other: null,
  },
  term_data: {
    data: "",
    other: "",
  },
});
const selected_items = ref({
  items_company_data: [],
  items_payment_terms: [],
  items_employee_type: [],
});

const rules_valid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
  ],
  companyData: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  role: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  team: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  radioRules: [(v) => !!v || "กรุณาเลือก 1 อัน"],
});

watch(data_input.value, () => {
  console.log("uuuuuaaaaaaaaaaaaaa", data_input.value);
  emit("form-update", data_input.value);
});

onMounted(async () => {
  const promise1 = await getCompanies();
  const promise2 = await getPaymentTerm();
  const promise3 = await getEmployeeType();

  Promise.all([promise1, promise2, promise3]);
});

const getEmployeeType = async () => {
  try {
    // loading.value.roles = true;
    const response = await EmployeeType.getEmployeeTypeAll();
    if (response.data?.is_success) {
      selected_items.value.items_employee_type = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    // loading.value.roles = false;
  }
};

const getCompanies = async () => {
  try {
    // loading.value.roles = true;
    const response = await compnayService.getCompanyAll();
    if (response.data?.is_success) {
      selected_items.value.items_company_data = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    // loading.value.roles = false;
  }
};

const getPaymentTerm = async () => {
  try {
    // loading.value.roles = true;
    const response = await PaymentTermService.getPaymentTermAll();
    if (response.data?.is_success) {
      selected_items.value.items_payment_terms = response.data.data;
      // console.log("termmmmmmmm", selected_items.value.items_payment_terms);
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    // loading.value.roles = false;
  }
};
</script>
