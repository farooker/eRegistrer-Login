<template>
  <v-app-bar class="custom-app-bar">
    <v-row dense>
      <v-col color="12" style="margin-left: 150px; margin-top: 45px">
        <StepperControl :currentStepNumber="step" />
      </v-col>
    </v-row>
  </v-app-bar>
  <v-form ref="form" style="margin-left: 150px; margin-right: 150px">
    <v-row dense>
      <v-col cols="12">
        <StepOne
          :isRegisteredVat="
            tempRegisterInfo.tax_register.type == '1' ? true : false
          "
          :bankInfoObj="tempRegisterInfo.bank_info"
          :isBusinessPartnerTypeId="
            tempRegisterInfo.customer_type_data.data.toString()
          "
          :isNaturePerson="is_natural_person"
          :taxCetagory="tax_cetagory"
          :companyIdSelect="tempRegisterInfo.company_data.data"
          v-show="step === 1"
          @on-input="handleStepOneChanged"
        />
      </v-col>
      <v-col cols="12">
        <StepTwo
          :address-item="tempRegisterInfo.customer_info.th.info"
          :contactItems="tempRegisterInfo.items_contects"
          :addressItemEn="tempRegisterInfo.customer_info.en.info"
          v-show="step === 2"
          @on-input="handleStepTwoChanged"
        />
      </v-col>
      <v-col cols="12">
        <StepThree
          :address-item="tempRegisterInfo.customer_info.th.info"
          :addressItemEn="tempRegisterInfo.customer_info.en.info"
          :type-form="props.typeForm"
          :contactItems="tempRegisterInfo.items_contects"
          v-show="step === 3"
          @on-input="handleStepThreeChanged"
        />
      </v-col>
      <v-col cols="12">
        <StepFour
          :type-form="props.typeForm"
          :BusinessPartnerGroup="input_data.step_one?.main_data?.bp_type_selection?? null"
          v-show="step === 4"
          @on-input="handleStepFourChanged"
        />
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <ButtonControl
          color="black"
          text="ย้อนกลับ"
          @button-clicked="handleReverse"
        />
      </v-col>
      <v-col cols="6" class="d-flex justify-start">
        <ButtonControl :text="button_name" @button-clicked="handleNext" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

import StepperControl from "../../controls/StepperControl";
import ButtonControl from "../../controls/ButtonControl";
import StepOne from "../../forms/accounts/vender-customer/StepOne";
import StepTwo from "../../forms/accounts/vender-customer/StepTwo";
import StepThree from "../../forms/accounts/vender-customer/StepThree";
import StepFour from "../../forms/accounts/vender-customer/StepFour.vue";
import AccountType from "@/utils/enum.util";
import { computed } from "vue";

const emit = defineEmits(["on-data-commit", "on-input"]);

const props = defineProps({
  typeForm: {
    type: Number,
    default: AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  registerInfo: {
    type: Object,
    default: null,
  },
});

const step = ref(1);
const form = ref(null);
const button_name = ref("ต่อไป");

const is_natural_person = computed(() => {
  return tempRegisterInfo.value.customer_type_data.data == 1;
});
const tax_cetagory = computed(() => {
  return tempRegisterInfo.value.thai_people_id ? "TH3" : null;
});

const tempRegisterInfo = ref(props.registerInfo);

const input_data = ref({
  step_one: {},
  step_two: {},
  step_three: {},
  step_four: {},
});

const handleNext = async () => {
  if (step.value === 4) {
    const is_valid = await form.value.validate();
    if (is_valid && is_valid["valid"]) {
      emit("on-data-commit", input_data.value);
    } else {
      window.alert("Register invalid data!, Please check!");
    }
  }

  if (step.value < 4) {
    step.value++;
  }

  if (step.value === 4) {
    button_name.value = "เสร็จ";
  }
};

const handleReverse = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const handleStepOneChanged = (data_obj) => {
  input_data.value.step_one = data_obj;
  emit("on-input", input_data.value)
};

const handleStepTwoChanged = (data_obj) => {
  input_data.value.step_two = data_obj;
  emit("on-input", input_data.value)
};

const handleStepThreeChanged = (data_obj) => {
  input_data.value.step_three = data_obj;
  emit("on-input", input_data.value)
};

const handleStepFourChanged = (data_obj) => {
  input_data.value.step_four = data_obj;
  emit("on-input", input_data.value)
};
</script>

<style scoped>
.custom-app-bar {
  height: 100px !important;
}
</style>
