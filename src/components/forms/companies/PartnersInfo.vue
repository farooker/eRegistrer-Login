<template>
  <v-form ref="partnerInfo">
    <v-row>
      <v-col cols="12"><h2>2.ข้อมูลคู่ค้า</h2></v-col>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row dense no-gutters>
            <v-col cols="12" v-if="isNaturalPerson">
              <v-card-title>
                <h6>คำนำหน้าชื่อ</h6>
              </v-card-title>
              <v-col cols="12">
                <v-radio-group
                  v-model="data_input.partner_info.th.gender"
                  inline
                  :rules="textRequired"
                >
                  <v-radio label="นาย" value="นาย"></v-radio>
                  <v-radio label="นาง" value="นาง"></v-radio>
                  <v-radio label="นางสาว" value="นางสาว"></v-radio>
                </v-radio-group>
              </v-col>
            </v-col>

            <v-col cols="12" class="mt-n5" v-if="isNaturalPerson">
              <v-card-title>
                <h6>ชื่อนามสกุลบุคคลธรรมดา (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.th.name_th"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" class="mt-n5" v-if="!isNaturalPerson">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.th.name_th"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.th.address_th"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <AddressInputControlTH
                :rules="textRequired"
                tag-desc="(ภาษาไทย)"
                key-value="id"
                key-title="name_th"
                :is-disable-address="false"
                @on-input="handleAddressInputTh"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-6">
          <v-row dense no-gutters>
            <v-col cols="12" v-if="isNaturalPerson">
              <v-card-title>
                <h6>คำนำหน้าชื่อ</h6>
              </v-card-title>
              <v-col cols="12">
                <v-radio-group
                  v-model="data_input.partner_info.en.gender"
                  inline
                  :rules="textRequired"
                >
                  <v-radio label="Mr." value="Mr."></v-radio>
                  <v-radio label="Mrs." value="Mrs."></v-radio>
                  <v-radio label="Miss" value="Miss"></v-radio>
                </v-radio-group>
              </v-col>
            </v-col>

            <v-col cols="12" v-if="isNaturalPerson">
              <v-card-title>
                <h6>ชื่อนามสกุลบุคคลธรรมดา (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.en.name_en"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" class="mt-n5" v-if="!isNaturalPerson">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.en.name_en"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.partner_info.en.address_en"
                class="ml-2"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="mt-n5">
              <!-- <AddressInputControlEn
                tag-desc="(ภาษาอังกฤษ)"
                key-value="id"
                key-title="name_th"
                :is-disable-address="true"
                :address-item="data_input.partner_info.th.info"
                @on-input="handleAddressInputTh"
              /> -->
              <ManaulAddressInputControl
                tag-desc="(ภาษาอังกฤษ)"
                @on-input="handleAddressInputEn"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title>
            <v-row dense>
              <v-col class="d-flex align-center" cols="4"
                ><h6>ชื่อผู้ติดต่อ (ภาษาอังกฤษ)</h6>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><h6>เบอร์โทรศัพท์</h6>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><h6>Email เพื่อแจ้งชำระ</h6>
              </v-col>
            </v-row>
            <v-row
              dense
              v-for="(item, index) in data_input.items_contects"
              :key="index"
            >
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  :rules="textRequired"
                  v-model="item.contact_name"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  :rules="textRequired"
                  v-model="item.contact_mobile_number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  :rules="textRequired"
                  v-model="item.contact_email"
                  variant="outlined"
                  color="red"
                  append-icon="mdi mdi-close-circle"
                ></v-text-field>
              </v-col>
            </v-row>
            <ButtonControl
              icon="mdi mdi-plus"
              text="เพิ่ม"
              @button-clicked="handleAddNewContact"
            />
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <AccountMoneyInputControl @on-input="handleMoneyTranferInput" />
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex justify-end mt-5" v-if="!isHideButton">
        <ButtonControl
          color="black"
          text="ย้อนกลับ"
          @button-clicked="handleReverse"
        />
      </v-col>
      <v-col cols="6" class="d-flex justify-start mt-5" v-if="!isHideButton">
        <ButtonControl text="ถัดไป" @button-clicked="handleNext" />
        {{ propsVar.isNaturalPerson ? "" : propsVar.companyNameTh }}
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import ButtonControl from "@/components/controls/ButtonControl.vue";
import AddressInputControlTH from "@/components/controls/AddressInputControl.vue";
// import AddressInputControlEn from "@/components/controls/AddressInputControl.vue";
import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";
import AccountMoneyInputControl from "@/components/controls/AccountMoneyInputControl.vue";

import { ref } from "vue";
import { watch } from "vue";
import { watchEffect } from "vue";

const propsVar = defineProps({
  companyNameTh: {
    type: String,
    default: "",
  },
  companyNameEn: {
    type: String,
    default: "",
  },
  isNaturalPerson: {
    type: Boolean,
    default: false,
  },
  isVender: {
    type: Boolean,
    default: false,
  },
  isHideButton: {
    type: Boolean,
    default: false,
  },
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const emit = defineEmits([
  "on-button-ok-click",
  "on-button-cancel-click",
  "on-input",
  "on-input-item-contact",
]);
const partnerInfo = ref(null);
const data_input = ref({
  partner_info: {
    th: {
      gender: "",
      name_th: propsVar.isNaturalPerson === false ? "" : propsVar.companyNameTh,
      address_th: "",
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
    en: {
      gender: "",
      name_en: propsVar.isNaturalPerson === false ? "" : propsVar.companyNameEn,
      address_en: "",
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
  },
  items_contects: [],
  bank_info: {
    id: "",
    acc_name_en: "",
    bank_name: "",
    bank_branch: "",
    acc_number: "",
  },
});

watchEffect(() => {
  data_input.value.partner_info.th.name_th = propsVar.isNaturalPerson ? "" : propsVar.companyNameTh
  data_input.value.partner_info.en.name_en = propsVar.isNaturalPerson ? "" : propsVar.companyNameEn
})

watch(data_input.value, (newValue) => {
  emit("on-input", newValue);
});

watch(data_input.value.items_contects, (newValue) => {
  emit("on-input-item-contact", newValue);
});

const handleAddressInputTh = (addressLocation) => {
  // console.log(addressLocation)
  data_input.value.partner_info.th.info = addressLocation;
  // data_input.value.partner_info.en.info = addressLocation;
};

const handleAddressInputEn = (addressLocation) => {
  data_input.value.partner_info.en.info = addressLocation;
};

const handleAddNewContact = () => {
  data_input.value.items_contects.push({
    contact_name: "",
    contact_mobile_number: "",
    contact_email: "",
  });
};

const handleMoneyTranferInput = (data) => {
  data_input.value.bank_info = data;
};

const handleReverse = async () => {
  emit("on-button-cancel-click");
};

const handleNext = async () => {
  const is_valid = await partnerInfo.value.validate();
  if (is_valid && is_valid["valid"]) {
    emit("on-button-ok-click");
  } else {
    console.log("Partner Info Invalid!!!");
  }
};
</script>
