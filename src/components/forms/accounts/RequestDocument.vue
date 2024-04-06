<template>
  <v-form ref="form">
    <v-card-title>
      <h3>ขอเอกสารเพิ่มเติม</h3>
    </v-card-title>
    <v-card class="pl-8 pr-8">
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-radio-group v-model="inputData.radio">
            <v-radio
              label="ขอเอกสารเพิ่มเติมจาก Contact Owner"
              color="black"
              :value="1"
            ></v-radio>
            <v-card
              color="secondary_active"
              max-width="450"
              class="ml-10 pa-3 mb-2"
            >
              <v-row dense>
                <v-col cols="12" class="d-flex justify-start">
                  <h4 style="color: rgb(213, 109, 109)">
                    {{ inputData.contact_owner }}
                  </h4>
                </v-col>
                <v-col cols="12" class="d-flex justify-start">
                  <h4>Retail Marketing</h4>
                  / <span class="text-grey">SAMYAN MITTOWN</span>/
                  <span class="text-grey">Commercil</span>
                </v-col>
              </v-row>
            </v-card>
            <v-text-field
              class="ml-12"
              density="compact"
              dense
              variant="outlined"
              v-model="inputData.contact_owner"
            ></v-text-field>
            <v-radio
              label="ขอเอกสารเพิ่มเติมจาก Vender"
              color="black"
              :value="2"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12">
          <v-select
            class="ml-10 pa-1 mt-n8"
            density="compact"
            :items="itemsBusinessPartner"
            variant="outlined"
            item-title="contact_owner.email"
            item-value="contact_owner.email"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

    <v-card-title>
      <h3>เอกสาร</h3>
    </v-card-title>
    <v-card class="pa-8">
      <v-row dense no-gutters>
        <v-col cols="12" class="mt-n5">
          <v-card-title>
            <h5>ระบุเอกสารที่ต้องการ</h5>
          </v-card-title>
          <v-select
            :items="itemsDocumentType"
            item-value="id"
            item-title="name_th"
            density="compact"
            v-model="inputData.document_type"
            multiple
            chips
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" class="mt-n5">
          <v-card-title>
            <h5>เอกสารอื่นๆ</h5>
          </v-card-title>
          <v-textarea
            v-model="inputData.comment"
            variant="outlined"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
  <v-footer color="transparent" style="margin-top: 50px">
    <v-row justify="center">
      <v-col cols="auto">
        <button-control
          color="black"
          text="ย้อนกลับ"
          width="100"
          @button-clicked="handleBack"
        />
      </v-col>
      <v-col cols="auto">
        <button-control
          type="submit"
          @button-clicked="handleSubmit"
          color="secondary"
          text="ตกลง"
          width="100"
        />
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import OtherService from "@/apis/OtherService";
const { showDialog } = useConfirmationDialog();

const props = defineProps({
  pb_number: {
    type: String,
  },
});

const emit = defineEmits(["on-commit-data", "on-back"]);

const responseData = {
  business_partners: [
    {
      name_th: "ชื่อธุรกิจ (ไทย)",
      name_en: "Business Name (English)",
      taxpayer_id_number: "1234567890123",
      business_partner_role: "RoleXYZ",
      contact_owner: {
        email: "owner@example.com",
        team: "TeamXYZ",
        company: "CompanyABC",
        business_unit: "Unit123",
      },
      created_at: "2023-11-10T14:20:12",
    },
  ],
};

const inputData = ref({
  radio: "",
  contact_owner: responseData.business_partners[0].contact_owner.email,
  vender: "",
  document_type: [],
  comment: "",
});
const itemsDocumentType = ref([]);
const itemsBusinessPartner = ref(responseData.business_partners);
const form = ref(null);

onMounted(async () => {
  await onLoadDocumentTypes();
});

const handleBack = () => {
  emit("on-back");
};

const onLoadDocumentTypes = async () => {
  try {
    const response = await OtherService.getDocumentType();
    if (response.data?.is_success) {
      itemsDocumentType.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(
        val.message ?? "Error",
        val?.data?.error ?? "some thing error"
      );
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const handleSubmit = async () => {
  const is_valid = await form.value.validate();
  if (is_valid && is_valid["valid"]) {
    if (
      await showDialog(
        "ยืนยันส่งแบบฟอร์มของเอกสารเพิ่ม ?",
        'กรุณาตรวจสอบการส่งเรื่อง\nคลิกปุ่ม \\"ตกลง\\" เพื่อดำเนินการ'
      )
    ) {
      window.alert(
        `Request documents : commit data to [Account Detail] by data : ${JSON.stringify(
          inputData.value
        )}`
      );
      emit("on-commit-data", inputData.value);
    }
  } else {
    window.alert("Request documents invalid data!, Please check!");
  }
};
</script>
