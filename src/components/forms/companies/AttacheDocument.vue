<template>
  <v-row dense>
    <v-col cols="12"><h2>3.โปรดแนบเอกสาร ดังต่อไปนี้</h2></v-col>
    <v-col cols="12">
      <v-card class="pa-5">
        <v-col
          cols="12"
          class="mt-n5"
          v-for="(item, index) in itemsRequireDocument"
          :key="index"
        >
          <h5>{{ index + 1 }}. {{ item.name_en }}</h5>
        </v-col>
        <ChooseMultiFiles
          :max-file="10"
          icon="mdi mdi-file-document"
          @input-files="handleInputFiles"
        />
      </v-card>
    </v-col>
    <v-col cols="12"> </v-col>
    <v-col cols="6" class="d-flex justify-end mt-5" v-if="!isHideButton">
      <ButtonControl
        color="black"
        text="ย้อนกลับ"
        @button-clicked="handleReverse"
      />
    </v-col>
    <v-col cols="6" class="d-flex justify-start mt-5" v-if="!isHideButton">
      <ButtonControl text="ถัดไป" @button-clicked="handleNext" />
    </v-col>
  </v-row>
</template>

<script setup>
import ButtonControl from "@/components/controls/ButtonControl.vue";
import ChooseMultiFiles from "../ChooseMultiFiles.vue";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted, ref } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  businessPartnerRoleId: {
    type: String,
  },
  businessPartnerTypeId: {
    type: String,
  },
  isVatRegistered: {
    type: Boolean,
  },
  isFilledBookBank: {
    type: Boolean,
  },
  companyIds: {
    type: Array,
  },
  isHideButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "on-button-ok-click",
  "on-button-cancel-click",
  "on-input-files",
]);

const handleInputFiles = (files) => {
  emit("on-input-files", files);
};

onMounted(async () => {
  await getDocumentRequire();
});

const itemsRequireDocument = ref([]);

const getDocumentRequire = async () => {
  try {
    const response = await PartnerServive.getDocumentRequiresByInfo(
      props.businessPartnerRoleId,
      props.businessPartnerTypeId,
      props.isVatRegistered,
      props.isFilledBookBank,
      props.companyIds
    );
    if (response.data?.is_success) {
      itemsRequireDocument.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

const handleReverse = () => {
  emit("on-button-cancel-click");
};

const handleNext = async () => {
  emit("on-button-ok-click");
};
</script>
