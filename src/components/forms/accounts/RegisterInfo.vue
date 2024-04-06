<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>ต้องการลงทะเบียนแบบใด</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.type_register">
                <v-radio
                  v-for="(item, index) in items_type_register"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>ต้องการข้อมูลแบบใด</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.type_data">
                <v-radio
                  v-for="(item, index) in items_type_data"
                  :label="item.name_th"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h3>ส่ง Email ให้ Vender กรอกเอง</h3>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>สำหรับบริษัท</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-select
                class="ml-6 mr-6"
                chips
                v-model="data_input.company_data.data"
                :items="itemsCompanyData"
                multiple
                item-value="id"
                item-title="name_th"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>Payment Terms</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.term_data.data">
                <v-radio
                  v-for="(item, index) in itemsPaymentTerms"
                  :label="item.description"
                  :key="index"
                  :value="item.id"
                />
                <!-- <v-radio>
                  <template v-slot:label>
                    <div>
                      <v-row dense>
                        <v-col cols="6">
                          <span>อื่นๆ</span>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="data_input.term_data.other"
                            variant="outlined"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-radio> -->
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="ml-6 mt-n6 d-flex flex-row">
              <v-radio-group style="width: auto">
                <v-radio label="อื่นๆ"></v-radio>
              </v-radio-group>
              <v-text-field
                class="mr-12"
                style="margin-left: -900px"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.term_data.other"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h3>1.ประเภทคู่ค้า</h3>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense class="mt-5">
            <v-col cols="12">
              <v-radio-group
                class="ml-6 d-flex"
                v-model="data_input.customer_type_data.data"
              >
                <v-radio
                  v-for="(item, index) in items_cutomer_type"
                  :label="item.name_th"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="ml-6 d-flex flex-row">
              <v-radio-group style="width: auto">
                <v-radio label="อื่นๆ"></v-radio>
              </v-radio-group>
              <v-text-field
                class="mr-12"
                style="margin-left: -900px"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.customer_type_data.other"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense text-align="center">
            <v-col cols="3" class="d-flex align-center">
              <h4 class="ml-5">เลขประจำผู้เสียภาษีอากร</h4>
            </v-col>
            <v-col cols="7" class="d-flex align-center">
              <ThaiIdInputControl
                :initialOtpValue="
                  props.registerFormDetail?.business_partner_register_form
                    ?.taxpayer_id_number ?? ''
                "
                class="mt-5"
                @on-input="handleThaiId"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-radio-group
            class="ml-6 mt-5"
            v-model="data_input.tax_register.type"
          >
            <v-radio label="จดทะเบียนภาษีมูลค่าเพิ่ม" value="1"></v-radio>
          </v-radio-group>
          <v-radio-group
            class="ml-6 mt-n4"
            v-model="data_input.tax_register.branch"
          >
            <v-radio class="ml-5" label="สำนักงานใหญ่" value="1"></v-radio>
            <v-radio
              class="ml-5"
              v-model="data_input.tax_register.branch_code"
              label="สาขา"
              value="0"
            ></v-radio>
          </v-radio-group>
          <v-radio-group
            class="ml-6 mt-n4"
            v-model="data_input.tax_register.type"
          >
            <v-radio label="ไม่จดทะเบียนภาษีมูลค่าเพิ่ม" value="0"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>ประเภทธุรกิจ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-select
                class="ml-6 mr-6"
                v-model="data_input.type_business.data"
                :items="itemCompanyCatagory"
                item-value="id"
                placeholder="เลือกคำตอบ"
                item-title="name_th"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="1">
              <v-radio-group v-model="data_input.type_business.is_other">
                <v-radio label="อื่นๆ" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="11">
              <v-text-field
                class="mr-6"
                v-if="data_input.type_business.is_other"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.type_business.other"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>ประเภทสินค้าและบริการ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                class="mr-6 ml-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.type_product_service"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h3>2.ข้อมูลคู่ค้า</h3>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense>
            <v-col cols="12">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                v-model="data_input.customer_info.th.company_name"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.customer_info.th.address"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <AddressInputControlTH
                tag-desc="(ภาษาไทย)"
                key-value="id"
                key-title="name_th"
                class="ml-5 mr-5"
                :address-item="data_input.customer_info.th.info"
                :is-disable-address="false"
                @on-input="handleAddressInputTh"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense>
            <v-col cols="12">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                v-model="data_input.customer_info.en.company_name"
                density="compact"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                v-model="data_input.customer_info.en.address"
                density="compact"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- <AddressInputControlEN
                tag-desc="(ภาษาอังกฤษ)"
                key-value="id"
                key-title="name_en"
                class="ml-5 mr-5"
                :is-disable-address="true"
                :address-item="data_input.customer_info.en.info"
              /> -->
              <ManaulAddressInputControl
                tag-desc="(ภาษาอังกฤษ)"
                class="ml-5 mr-5"
                :address-item="data_input.customer_info.en.info"
                @on-input="handleAddressEN"
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
                ><h6>
                  ชื่อผู้ติดต่อ (ภาษาอังกฤษ) ขึ้นมาอย่างน้อย 1 เพิ่มได้ไม่เกิน 2
                </h6>
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
                  v-model="item.name"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  v-model="item.phone"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  v-model="item.email"
                  variant="outlined"
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
          <AccountMoneyInputControl
            :acc-name-en="data_input.customer_info.en.company_name"
            :bank-name="data_input.bank_info.bank_name"
            :bank-branch="
              props.registerFormDetail?.business_partner_profile_form
                ?.bank_branch ?? ''
            "
            :bank-account-number="
              props.registerFormDetail?.business_partner_profile_form
                ?.bank_account_number ?? ''
            "
            @on-input="handleMoneyTranferInput"
          />
        </v-card>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <ButtonControl text="ต่อไป" @button-clicked="handleNext" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

import ButtonControl from "@/components/controls/ButtonControl.vue";
import ThaiIdInputControl from "@/components/controls/ThaiIdInputControl";
import AddressInputControlTH from "@/components/controls/AddressInputControl.vue";
// import AddressInputControlEN from "@/components/controls/AddressInputControl.vue";
import AccountMoneyInputControl from "@/components/controls/AccountMoneyInputControl.vue";
import PaymentTermService from "@/apis/PaymentTermService";
import CompnayService from "@/apis/CompnayService";
import { onMounted, watchEffect, watch } from "vue";
import PartnerServive from "@/apis/PartnerServive";
import TypesService from "@/apis/TypesService";
import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["on-commit-data", "on-input"]);

const props = defineProps({
  registerFormDetail: {
    type: Object,
    default: () => {},
  },
});

const form = ref(null);
const itemsCompanyData = ref([]);
const itemsPaymentTerms = ref([]);
const itemCompanyCatagory = ref([]);
const items_cutomer_type = ref([]);
const items_type_data = ref([]);
const items_type_register = ref([]);

const data_input = ref({
  type_register: null, // link
  type_data: null, // link
  company_data: {
    is_other: false,
    data: null, // link
    other: null,
  },
  term_data: {
    data: null, // link
    other: null,
  },
  customer_type_data: {
    data: null, // link
    other: null,
  },
  thai_people_id: null,
  tax_register: {
    type: null,
    branch: null,
    branch_code: null,
  },
  customer_info: {
    en: {
      company_name: null,
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
    th: {
      company_name: null,
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
  },
  type_business: {
    is_other: false,
    data: null,
    other: null,
  },
  type_product_service: null,
  items_contects: [],
  bank_info: {
    acc_name_en: null,
    bank_name: null,
    bank_branch: null,
    acc_number: null,
    bank_key: null,
  },
});

const provicesInfoTh = ref({
  province: null,
  district: null,
  parish: null,
  zip_code: null,
});

const provicesInfoEn = ref({
  province: null,
  district: null,
  parish: null,
  zip_code: null,
});

watchEffect(() => {
  if (props.registerFormDetail) {
    data_input.value.type_register =
      props.registerFormDetail?.business_partner_register_form?.business_partner_role?.id;

    data_input.value.type_data =
      props.registerFormDetail.business_partner_register_form?.fill_type.id;

    data_input.value.customer_type_data.data =
      props.registerFormDetail?.business_partner_profile_form?.business_partner_type.id;

    const companies =
      props.registerFormDetail.business_partner_register_form?.company ??
      [].map((el) => el.id);
    data_input.value.company_data.data = companies;

    data_input.value.thai_people_id =
      props.registerFormDetail.business_partner_register_form?.taxpayer_id_number;

    data_input.value.term_data.data =
      props.registerFormDetail.business_partner_register_form?.payment_term.id;

    data_input.value.type_business.data =
      props.registerFormDetail.business_partner_profile_form?.company_category.id;

    data_input.value.type_product_service =
      props.registerFormDetail.business_partner_profile_form?.product_category;

    data_input.value.customer_info.th.company_name =
      props.registerFormDetail.business_partner_register_form?.name_th;

    data_input.value.customer_info.th.address =
      props.registerFormDetail.business_partner_profile_form?.address_th;

    data_input.value.customer_info.en.company_name =
      props.registerFormDetail.business_partner_register_form?.name_en;

    data_input.value.customer_info.en.address =
      props.registerFormDetail.business_partner_profile_form?.address_en;

    provicesInfoTh.value.province =
      props.registerFormDetail.business_partner_profile_form?.province_th.id;

    provicesInfoTh.value.district =
      props.registerFormDetail.business_partner_profile_form?.district_th.id;

    provicesInfoTh.value.parish =
      props.registerFormDetail.business_partner_profile_form?.subdistrict_th.id;

    provicesInfoTh.value.zip_code =
      props.registerFormDetail.business_partner_profile_form?.postal_code_th.id;

    provicesInfoEn.value.province =
      props.registerFormDetail.business_partner_profile_form?.province_en;

    provicesInfoEn.value.district =
      props.registerFormDetail.business_partner_profile_form?.district_en;

    provicesInfoEn.value.parish =
      props.registerFormDetail.business_partner_profile_form?.subdistrict_en;

    provicesInfoEn.value.zip_code =
      props.registerFormDetail.business_partner_profile_form?.postal_code_th.code;

    data_input.value.customer_info.th.info = provicesInfoTh.value;
    data_input.value.customer_info.en.info = provicesInfoEn.value;

    data_input.value.tax_register.type = props.registerFormDetail
      .business_partner_profile_form?.is_vat_registered
      ? "1"
      : "0";

    data_input.value.tax_register.branch = props.registerFormDetail
      .business_partner_profile_form?.is_head_office
      ? "1"
      : "0";

    data_input.value.items_contects = [];
    for (let index = 1; index < 10; index++) {
      if (!props.registerFormDetail.business_partner_profile_form) return;
      const contact_name =
        props.registerFormDetail.business_partner_profile_form[
          `contact_name_${index}`
        ];
      const contact_email =
        props.registerFormDetail.business_partner_profile_form[
          `contact_email_${index}`
        ];
      const contact_mobile_number =
        props.registerFormDetail.business_partner_profile_form[
          `contact_mobile_number_${index}`
        ];
      if (!contact_name || !contact_email || !contact_mobile_number) break;
      data_input.value.items_contects.push({
        name: contact_name,
        email: contact_email,
        phone: contact_mobile_number,
      });
    }

    data_input.value.bank_info.acc_name_en =
      props.registerFormDetail.business_partner_register_form.name_en;

    data_input.value.bank_info.bank_name =
      props.registerFormDetail.business_partner_profile_form?.bank.id.toString();

    data_input.value.bank_info.bank_branch =
      props.registerFormDetail.business_partner_profile_form?.bank_branch;

    data_input.value.bank_info.acc_number =
      props.registerFormDetail.business_partner_profile_form?.bank_account_number;
  }
});

onMounted(async () => {
  await getCompanies();
  await getPaymentTerm();
  await getCompaniesCategories();
  await getBusinessPartnerType();
  await getFillTypes();
  await getBusinessPartnerRoles();
});

const createPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.createPaymentTerm(
      data_input.value.type_register,
      "00000",
      data_input.value.term_data.other
    );
    if (response.data?.is_success) {
      data_input.value.term_data.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const createBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.createBusinessPartnerType(
      data_input.value.customer_type_data.other,
      "",
      0 // is_natural_person.value
    );
    if (response.data?.is_success) {
      data_input.value.customer_type_data.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const createComapnyCetagory = async () => {
  try {
    const response = await CompnayService.createCompanyGetagory(
      data_input.value.type_business.other,
      ""
    );
    if (response.data?.is_success) {
      data_input.value.type_business.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const getBusinessPartnerRoles = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerRolesAll();
    if (response.data?.is_success) {
      items_type_register.value = response.data?.data;
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

const getFillTypes = async () => {
  try {
    const response = await TypesService.getTypesAll();
    if (response.data?.is_success) {
      items_type_data.value = response.data.data;
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

const getBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.getPartnerTypeAll();
    if (response.data?.is_success) {
      items_cutomer_type.value = response.data.data;
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
      itemsCompanyData.value = response.data.data;
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

const getCompaniesCategories = async () => {
  try {
    const response = await CompnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      itemCompanyCatagory.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

watch(
  data_input.value,
  () => {
    emit("on-input", data_input.value);
  },
  { deep: true }
);

const handleAddNewContact = () => {
  data_input.value.items_contects.push({ name: "", phone: "", email: "" });
};

const handleThaiId = (id) => {
  data_input.value.thai_people_id = id;
};

const handleNext = async () => {
  const is_valid = await form.value.validate();
  if (data_input.value.items_contects.length < 3) return;
  if (is_valid && is_valid["valid"]) {
    if (
      data_input.value.customer_type_data.other &&
      data_input.value.customer_type_data.other !== ""
    )
      await createBusinessPartnerType();

    if (
      data_input.value.term_data.other &&
      data_input.value.term_data.other !== ""
    )
      await createPaymentTerm();

    if (
      data_input.value.type_business.other &&
      data_input.value.type_business.other !== ""
    )
      await createComapnyCetagory();

    if (data_input.value.tax_register.branch == "1")
      data_input.value.tax_register.branch_code = "00000";

    if (data_input.value.tax_register.type == "0")
      data_input.value.tax_register.branch_code = "NVAT";

    emit("on-commit-data", data_input.value);
  }
};

const handleAddressInputTh = (address) => {
  data_input.value.customer_info.th.info = address;
  // data_input.value.customer_info.en.info = address;
};

const handleAddressEN = (address) => {
  data_input.value.customer_info.en.info = address;
  console.log("ddddd", address)
};
const handleMoneyTranferInput = (data) => {
  data_input.value.bank_info = data;
};
</script>
