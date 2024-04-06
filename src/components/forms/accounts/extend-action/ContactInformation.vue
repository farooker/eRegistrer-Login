<template>
  <!-- ข้อมูลผู้ติดต่อ -->
  <v-container>
    <v-row dense>
      <v-col cols="12"><h2>ข้อมูลผู้ติดต่อ</h2></v-col>
      <v-col cols="12">
        <v-card class="">
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>Business Partner Number</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.partner_number"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Branch Code</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_code"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อผู้ติดต่อ 1</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.contact_name_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Telephone 1</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.telephone_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Email 1</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.email_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Comments</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.comments_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Remark</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.remark_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อผู้ติดต่อ 2</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.contact_name_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Telephone 2</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.telephone_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Email 2</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.email_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Comments 2</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.comments_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Remark 2</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.remark_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch, watchEffect } from "vue";

const emit = defineEmits(["on-data-update"]);

const propVar = defineProps({
  itemsContact: {
    type: Array,
    default: () => [],
  },
  partnerName: String,
  partnerNumber: String,
  changeAddress: {
    type: Object,
  },
});

const data_input = ref({
  partner_name: "",
  partner_number: "",
  branch_code: "",
  contact_name_1: "",
  telephone_1: "",
  email_1: "",
  comments_1: "",
  remark_1: "",
  contact_name_2: "",
  telephone_2: "",
  email_2: "",
  comments_2: "",
  remark_2: "",
});

watchEffect(() => {
  for (let index = 0; index < propVar.itemsContact.length; index++) {
    const el = propVar.itemsContact[index];
    data_input.value[`contact_name_${index + 1}`] = el.name;
    data_input.value[`telephone_${index + 1}`] = el.mobile_number;
    data_input.value[`email_${index + 1}`] = el.email;
    data_input.value[`remark_${index + 1}`] = el.remark;
  }

  data_input.value.partner_number = propVar.partnerNumber;
  data_input.value.branch_code = propVar.changeAddress?.branch_code;
  data_input.value.branch_description =
    propVar.changeAddress?.branch_description;
  data_input.value.partner_name = propVar.partnerName;
});

watch(
  data_input.value,
  () => {
    emit("on-data-update", data_input.value);
  },
  { deep: true, immediate: true }
);
</script>
