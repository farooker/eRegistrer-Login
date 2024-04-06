<template>
  <v-container fluid class="mt-8">
    <div style="margin-left: 150px; margin-right: 150px">
      <v-app-bar class="custom-app-bar" v-show="item_file_document.length > 0">
        <AttachedMenat
          :items="item_file_document"
          class="mb-9"
          @on-attach-file="handleAttchFiles"
          app
        />
      </v-app-bar>
      <div
        v-if="is_id_form === FORM_ID.REQUEST_DOCS"
        style="margin-left: 150px; margin-right: 150px"
      >
        <RequestDocument
          @on-back="handleReqDocumentBack"
          @on-commit-data="handleReqDocumentCommit"
        />
      </div>
      <div
        class="d-flex justify-end mb-5"
        v-if="is_id_form !== FORM_ID.REQUEST_DOCS"
      >
        <ButtonControl
          icon="mdi mdi-file-document"
          class="mr-2"
          text="ขอเอกสารเพิ่มเติม"
          @button-clicked="handleMoreDocs"
        />
        <ButtonControl
          icon="mdi mdi-content-save-cog"
          text="Save Daft"
          @button-clicked="handleSaveDaft"
        />
      </div>
      <RegisterInfo
        style="margin-left: 150px; margin-right: 150px"
        :register-form-detail="register_form_detail"
        @on-commit-data="handleRegisterCommit"
        @on-input="handleRegisterInput"
        v-if="is_id_form === FORM_ID.REGISTER_INFO"
      />
      <SteperInfo
        v-if="is_id_form === FORM_ID.STEPPER_INFO"
        :type-form="customer_or_vender"
        :register-info="input_data.register_info_form"
        @on-data-commit="handleCustCommit"
        @on-input="handleSetpInput"
      />
    </div>
  </v-container>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import ButtonControl from "@/components/controls/ButtonControl.vue";
import AttachedMenat from "@/components/forms/accounts/AttachedMenat.vue";
import RegisterInfo from "@/components/forms/accounts/RegisterInfo.vue";
import SteperInfo from "../../components/forms/accounts/SteperInfo.vue";
import RequestDocument from "../../components/forms/accounts/RequestDocument.vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
const { showDialog } = useConfirmationDialog();

import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AccountType from "@/utils/enum.util";
import { onMounted } from "vue";
import PartnerServive from "@/apis/PartnerServive";

const route = useRoute();
const id = route.params.id;

const FORM_ID = {
  REGISTER_INFO: 0,
  STEPPER_INFO: 1,
  REQUEST_DOCS: 2,
};

const is_id_form = ref(FORM_ID.REGISTER_INFO);
const customer_or_vender = ref(AccountType.CUSTOMER);

const input_data = ref({
  register_info_form: {},
  stepper_info_form: {},
  attach_files: [],
});
const register_form_detail = ref(null);
const item_file_document = ref([]);
const acc_id = ref(id);

const handleAttchFiles = (item_files) => {
  input_data.value.attach_files = item_files;
};

watch(input_data.value, (newValue) => {
  console.warn(JSON.stringify(newValue));
});

const handleRegisterInput = (register_info_data) => {
  input_data.value.register_info_form = register_info_data;
  customer_or_vender.value = register_info_data.type_register;
};

const handleRegisterCommit = (register_info_data) => {
  input_data.value.register_info_form = register_info_data;
  customer_or_vender.value = register_info_data.type_register;
  is_id_form.value = FORM_ID.STEPPER_INFO;
};

const getRegisterFormDetail = async () => {
  try {
    const response = await PartnerServive.getRegisterFormDetail();
    if (response.data?.is_success) {
      register_form_detail.value = response.data?.data;
      item_file_document.value =
        register_form_detail.value.uploaded_document ??
        [].map((el) => {
          return {
            file: null,
            file_name: el.document_name,
            file_size: "15.2 MB",
          };
        });
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

const handleSetpInput = (stepper_data) => {
  input_data.value.stepper_info_form = stepper_data;
};

const handleCustCommit = async (stepper_info_data) => {
  input_data.value.stepper_info_form = stepper_info_data;
  if (
    !(await showDialog(
      "ยืนยันการบันทึกข้อมูล ?",
      'งานของคุณจะถูกย้ายไปยัง Ready To Export\nคลิกปุ่ม \\"ตกลง\\" เพื่อดำเนินการ'
    ))
  )
    return;

  console.error(JSON.stringify(input_data.value.stepper_info_form.step_three));
  const requestSaveDaftBusinessPartnerRegis = {
    form_number: "01700640914000",
    business_partner_register_form: {
      taxpayer_id_number:
        input_data.value.stepper_info_form.step_one?.main_data.tax_number ??
        null, // data.stepper_info_form.step_one?.main_data.tax_number
      name_th:
        input_data.value.register_info_form.customer_info.th.company_name ??
        null, // data.register_info_form.customer_info.th.company_name
      name_en:
        input_data.value.register_info_form.customer_info.en.company_name ??
        null, // data.register_info_form.customer_info.en.company_name
      form_status_id: 1 ?? null, //number
      business_partner_role_id:
        input_data.value.register_info_form.type_register ?? null, // data.register_info_form.type_register //number
      fill_type_id: input_data.value.register_info_form.type_data.data ?? null, // data.register_info_form.type_data.data //number
      company_id: 3, // unknow
      employee_type_id: "1,2", // unknow
      payment_term_id:
        input_data.value.register_info_form.term_data.data ?? null, // data.register_info_form.term_data.data
      registered_user_email: "user@example.com", // unknow
      created_at: "2023-11-10T14:20:12", // auto fill
      created_user_id: 1, // auto fill
      updated_at: "2023-11-12T10:30:45", // auto fill
      updated_user_id: 1, // auto fill
    },

    business_partner_profile_form: {
      business_partner_type_id:
        input_data.value.register_info_form.customer_type_data.data ?? null, // data.customer_type_data.data //number
      business_register_type_id:
        input_data.value.register_info_form.type_register ?? null, //  data.type_register //number
      is_vat_registered:
        input_data.value.register_info_form.tax_register.type ?? null, // data.tax_register.type //number
      is_head_office:
        input_data.value.register_info_form.tax_register.branch ?? null, // data.tax_register.branch //number
      branch_code:
        input_data.value.register_info_form.tax_register.branch_code ?? null, // data.tax_register.branch_code //string
      company_category_id:
        input_data.value.register_info_form.type_business.data ?? null, // data.type_business.data //number
      product_category:
        input_data.value.register_info_form.type_product_service ?? null, // data.type_product_service
      customer_category: "Wholesale", // unknow
      address_th:
        input_data.value.register_info_form.customer_info.th.address ?? null, // data.customer_info.th.address
      province_th_id:
        input_data.value.register_info_form.customer_info.th.province ?? null, // data.customer_info.th.province //number
      district_th_id:
        input_data.value.register_info_form.customer_info.th.district ?? null, // data.customer_info.th.district //number
      subdistrict_th_id:
        input_data.value.register_info_form.customer_info.th.parish ?? null, // data.customer_info.th.parish //number
      postal_code_th_id:
        input_data.value.register_info_form.customer_info.th.zip_code ?? null, // data.customer_info.th.zip_code //number
      address_en:
        input_data.value.register_info_form.customer_info.en.address ?? null, // data.customer_info.en.address
      province_en:
        input_data.value.register_info_form.customer_info.en.province ?? null, // data.customer_info.en.province
      district_en:
        input_data.value.register_info_form.customer_info.en.district ?? null, // data.customer_info.en.district
      subdistrict_en:
        input_data.value.register_info_form.customer_info.en.parish ?? null, // data.customer_info.en.parish
      postal_code_en_id:
        input_data.value.register_info_form.customer_info.en.zip_code ?? null, // data.customer_info.en.zip_code
      contact_name_1:
        input_data.value.register_info_form.items_contects[0]?.name ?? null, // data.items_contects[0]?.name
      contact_mobile_number_1:
        input_data.value.register_info_form.items_contects[0]?.phone ?? null, // data.items_contects[0]?.phone
      contact_email_1:
        input_data.value.register_info_form.items_contects[0]?.email ?? null, // data.items_contects[0]?.email
      contact_name_2:
        input_data.value.register_info_form.items_contects[2]?.name ?? null, // data.items_contects[2]?.name
      contact_mobile_number_2:
        input_data.value.register_info_form.items_contects[2]?.phone ?? null, // data.items_contects[2]?.phone
      contact_email_2:
        input_data.value.register_info_form.items_contects[2]?.email ?? null, // data.items_contects[2]?.email
      contact_name_3:
        input_data.value.register_info_form.items_contects[3]?.name ?? null, // data.items_contects[3]?.name
      contact_mobile_number_3:
        input_data.value.register_info_form.items_contects[3]?.phone ?? null, // data.items_contects[3]?.phone
      contact_email_3:
        input_data.value.register_info_form.items_contects[3]?.email ?? null, // data.items_contects[3]?.email
      bank_account_name:
        input_data.value.register_info_form.bank_info.acc_name_en ?? null, // data.bank_info.acc_name_en
      bank_id: input_data.value.register_info_form.bank_info.bank_name ?? null, // data.bank_info.bank_name //number
      bank_branch:
        input_data.value.register_info_form.bank_info.bank_branch ?? null, // data.bank_info.bank_branch
      bank_account_number:
        input_data.value.register_info_form.bank_info.acc_number ?? null, // data.bank_info.acc_number
      created_at: "2023-11-10T14:20:12", // auto fill
      created_user_id: 1, // auto fill
      updated_at: "2023-11-12T10:30:45", // auto fill
      updated_user_id: 1, // auto fill
    },

    account_information_form: {
      //SETEP ONE
      business_partner_number:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner ?? null, // data.stepper_info_form.step_one?.main_data.business_partner
      vendor_number:
        input_data.value.stepper_info_form.step_one?.main_data.vender_number ??
        null, // data.stepper_info_form.step_one?.main_data.vender_number
      customer_number: "C123", // unknow
      business_partner_group_id:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_gruop_selection ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_gruop_selection //number
      business_partner_category:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_catega ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_catega
      business_partner_role:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_role ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_role
      account_business_partner_type_id:
        input_data.value.stepper_info_form.step_one?.main_data
          .bp_type_selection ?? null, // data.stepper_info_form.step_one?.main_data.bp_type_selection //number
      is_natural_person: input_data.value.stepper_info_form.step_one?.main_data
        .naturel_person
        ? 1
        : 0 ?? null, // data.stepper_info_form.step_one?.main_data.naturel_person   //null ? 0:1
      tax_category:
        input_data.value.stepper_info_form.step_one?.main_data.tax_catega ??
        null, // data.stepper_info_form.step_one?.main_data.tax_catega
      industry:
        input_data.value.stepper_info_form.step_one?.main_data.indutry ?? null, // data.stepper_info_form.step_one?.main_data.indutry
      trading_partner:
        input_data.value.stepper_info_form.step_one?.main_data
          .tarding_partner ?? null, // data.stepper_info_form.step_one?.main_data.tarding_partner
      valid_from:
        input_data.value.stepper_info_form.step_one?.main_data.valid_from ??
        null, // data.stepper_info_form.step_one?.main_data.valid_from
      valid_to:
        input_data.value.stepper_info_form.step_one?.main_data.valid_to ?? null, // data.stepper_info_form.step_one?.main_data.valid_to

      //STEP TWO
      name1_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.one ??
        null, // data.stepper_info_form.step_two?.address_th.name.one
      name2_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.two ??
        null, // data.stepper_info_form.step_two?.address_th.name.two
      name3_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.three ??
        null, // data.stepper_info_form.step_two?.address_th.name.three
      name4_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.four ??
        null, // data.stepper_info_form.step_two?.address_th.name.four
      search_term1_th:
        input_data.value.stepper_info_form.step_two?.address_th.search.one ??
        null, // data.stepper_info_form.step_two?.address_th.search.one
      search_term2_th:
        input_data.value.stepper_info_form.step_two?.address_th.search.two ??
        null, // data.stepper_info_form.step_two?.address_th.search.two
      address1_th:
        input_data.value.stepper_info_form.step_two?.address_th.address.one ??
        null, // data.stepper_info_form.step_two?.address_th.address.one
      address2_th:
        input_data.value.stepper_info_form.step_two?.address_th.address.two ??
        null, // data.stepper_info_form.step_two?.address_th.address.two
      language:
        input_data.value.stepper_info_form.step_two?.country_info.country ??
        null, // data.stepper_info_form.step_two?.country_info.country
      name1_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.one ??
        null, // data.stepper_info_form.step_two?.address_th.name.one
      name2_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.two ??
        null, // data.stepper_info_form.step_two?.address_th.name.two
      name3_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.three ??
        null, // data.stepper_info_form.step_two?.address_th.name.three
      name4_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.four ??
        null, // data.stepper_info_form.step_two?.address_th.name.four
      search_term1_en:
        input_data.value.stepper_info_form.step_two?.address_en.search.one ??
        null, // data.stepper_info_form.step_two?.address_th.search.one
      search_term2_en:
        input_data.value.stepper_info_form.step_two?.address_en.search.two ??
        null, // data.stepper_info_form.step_two?.address_th.search.two
      address1_en:
        input_data.value.stepper_info_form.step_two?.address_en.address.one ??
        null, // data.stepper_info_form.step_two?.address_th.address.one
      address2_en:
        input_data.value.stepper_info_form.step_two?.address_en.address.two ??
        null, // data.stepper_info_form.step_two?.address_th.address.two
      country: "Thailand", // unknow

      //STEP THREE
      branch_description:
        input_data.value.stepper_info_form.step_three?.info.branch_desc ?? null, // data.stepper_info_form.step_three?.info.branch_desc
      default_branch_code:
        input_data.value.stepper_info_form.step_three?.info.branch_code ?? null, // data.stepper_info_form.step_three?.info.branch_code
      branch_name1_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.one ??
        null, //data.stepper_info_form.step_three?.address_th.name.one
      branch_name2_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.two ??
        null, // data.stepper_info_form.step_three?.address_th.name.two
      branch_name3_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.three ??
        null, // data.stepper_info_form.step_three?.address_th.name.three
      branch_name4_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.four ??
        null, // data.stepper_info_form.step_three?.address_th.name.four
      branch_search_term1_th:
        input_data.value.stepper_info_form.step_three?.address_th.search.one ??
        null, // data.stepper_info_form.step_three?.address_th.search.one
      branch_search_term2_th:
        input_data.value.stepper_info_form.step_three?.address_th.search.two ??
        null, // data.stepper_info_form.step_three?.address_th.search.two
      branch_address1_th:
        input_data.value.stepper_info_form.step_three?.address_th.address.one ??
        null, // data.stepper_info_form.step_three?.address_th.address.one
      branch_address2_th:
        input_data.value.stepper_info_form.step_three?.address_th.address.two ??
        null, // data.stepper_info_form.step_three?.address_th.address.two
      branch_province_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .province ?? null, // data.stepper_info_form.step_three?.address_th.location.province //number
      branch_distict_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .district ?? null, // data.stepper_info_form.step_three?.address_th.location.district //number
      branch_subdisticte_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .parish ?? null, // data.stepper_info_form.step_three?.address_th.location.parish  //number
      branch_postal_code_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .zip_code ?? null, // data.stepper_info_form.step_three?.address_th.location.zip_code //number
      branch_name1_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.one ??
        null, //data.stepper_info_form.step_three?.address_en.name.one
      branch_name2_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.two ??
        null, // data.stepper_info_form.step_three?.address_en.name.two
      branch_name3_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.three ??
        null, // data.stepper_info_form.step_three?.address_en.name.three
      branch_name4_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.four ??
        null, // data.stepper_info_form.step_three?.address_en.name.four
      branch_search_term1_en:
        input_data.value.stepper_info_form.step_three?.address_en.search.one ??
        null, // data.stepper_info_form.step_three?.address_en.search.one
      branch_search_term2_en:
        input_data.value.stepper_info_form.step_three?.address_en.search.two ??
        null, // data.stepper_info_form.step_three?.address_en.search.two
      branch_address1_en:
        input_data.value.stepper_info_form.step_three?.address_en.address.one ??
        null, // data.stepper_info_form.step_three?.address_en.address.one
      branch_address2_en:
        input_data.value.stepper_info_form.step_three?.address_en.address.two ??
        null, // data.stepper_info_form.step_three?.address_en.address.two
      branch_province_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .province ?? null, // data.stepper_info_form.step_three?.address_en.location.province //number
      branch_distict_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .district ?? null, // data.stepper_info_form.step_three?.address_en.location.district  //number
      branch_subdisticte_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .parish ?? null, // data.stepper_info_form.step_three?.address_en.location.parish //number
      branch_postal_code_en_id:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .zip_code ?? null, // data.stepper_info_form.step_three?.address_en.location.zip_code //number
      branch_contact_name_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.name
      branch_contact_mobile_number_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.phone
      branch_contact_email_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.email
      branch_contact_name_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.name
      branch_contact_mobile_number_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.phone
      branch_contact_email_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.email
      branch_contact_name_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.name
      branch_contact_mobile_number_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.phone
      branch_contact_email_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.email

      //STEP FOUR
      reconciliation_account_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .reconcliation_acct_seletion ?? null, // data.stepper_info_form.step_four?.more_data_one.reconcliation_acct_seletion //number
      instruction_key:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .instruction_key ?? null, // data.stepper_info_form.step_four?.more_data_one.instruction_key
      sort_key:
        input_data.value.stepper_info_form.step_four?.more_data_one.sort_key ??
        null, // data.stepper_info_form.step_four?.more_data_one.sort_key
      check_double_invoice:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .check_double_invoice ?? null, // data.stepper_info_form.step_four?.more_data_one.check_double_invoice
      payment_methods: Array.isArray(
        input_data.value.stepper_info_form.step_four?.more_data_one
          .payment_methodes
      )
        ? input_data.value.stepper_info_form.step_four?.more_data_one.payment_methodes.join(
            ","
          )
        : null, // data.stepper_info_form.step_four?.more_data_one.payment_methodes
      payment_term_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .pyment_term_selection ?? null, // data.stepper_info_form.step_four?.more_data_one.pyment_term_selection //number
      payment_terms_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .payment_terms_selection ?? null, // data.stepper_info_form.step_four?.more_data_one.payment_terms_selection // number
      withholding_tax_type_1:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["1"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["1"]
      withholding_tax_code_1:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["1"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["1"]
      subject_to_wht_1:
        input_data.value.stepper_info_form.step_four?.subject_wht?.["1"] ??
        null, // data.stepper_info_form.step_four?.subject_wht?.["1"]
      type_of_recipient_1:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["1"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["1"]
      withhold_agent_1:
        input_data.value.stepper_info_form.step_four?.with_agent?.["1"] ?? null, // data.stepper_info_form.step_four?.with_agent?.["1"]
      obligation_from_1:
        input_data.value.stepper_info_form.step_four?.obli_from?.["1"] ?? null, // data.stepper_info_form.step_four?.obli_from?.["1"]
      obligation_to_1:
        input_data.value.stepper_info_form.step_four?.obli_to?.["1"] ?? null, // data.stepper_info_form.step_four?.obli_to?.["1"]
      withholding_tax_type_2:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["2"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["2"]
      withholding_tax_code_2:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["2"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["2"]
      subject_to_wht_2:
        input_data.value.stepper_info_form.step_four?.subject_wht?.[2] ?? null, // data.stepper_info_form.step_four?.subject_wht?.[2]
      type_of_recipient_2:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["2"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["2"]
      withhold_agent_2:
        input_data.value.stepper_info_form.step_four?.with_agent?.["2"] ?? null, // data.stepper_info_form.step_four?.with_agent?.["2"]
      obligation_from_2:
        input_data.value.stepper_info_form.step_four?.obli_from?.["2"] ?? null, // data.stepper_info_form.step_four?.obli_from?.["2"]
      obligation_to_2:
        input_data.value.stepper_info_form.step_four?.obli_to?.["2"] ?? null, // data.stepper_info_form.step_four?.obli_to?.["2"]
      withholding_tax_type_3:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["3"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["3"]
      withholding_tax_code_3:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["3"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["3"]
      subject_to_wht_3:
        input_data.value.stepper_info_form.step_four?.subject_wht?.["3"] ??
        null, // data.stepper_info_form.step_four?.subject_wht?.["3"]
      type_of_recipient_3:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["3"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["3"]
      purchase_organization:
        input_data.value.stepper_info_form.step_four?.vander_info.pruch ?? null, // data.stepper_info_form.step_four?.vander_info.pruch
      order_currency:
        input_data.value.stepper_info_form.step_four?.vander_info
          .order_currency ?? null, // data.stepper_info_form.step_four?.vander_info.order_currency
      gr_base_invoice_verif:
        input_data.value.stepper_info_form.step_four?.gb_base ?? null, // data.stepper_info_form.step_four?.gb_base
      long_text_general: "This is a long general text.", //unknow
      house_bank: "BankXYZ" ?? null, //unknow
      long_text_company: "This is a long company text.", //unknow
      saleperson: "SalesPerson123", //unknow
      telephone: "1234567890", //unknow
      customer: "CustomerXYZ", //unknow
      head_office:
        input_data.value.stepper_info_form.step_four?.vander_info.head_office ??
        null, // data.stepper_info_form.step_four?.vander_info.head_office
      payee_in_doc:
        input_data.value.stepper_info_form.step_four?.vander_info
          .pa_yee_in_doc ?? null, // data.stepper_info_form.step_four?.vander_info.pa_yee_in_doc
    },
  };
  console.warn(JSON.stringify(requestSaveDaftBusinessPartnerRegis));
  try {
    const response = await PartnerServive.createSaveBusinessPartnerRegisterForm(
      requestSaveDaftBusinessPartnerRegis
    );
    if (response.data.is_success) {
      router.push({
        name: "AccountManagement",
        query: { path: "ExportTask" },
      });
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

const handleMoreDocs = () => {
  is_id_form.value = FORM_ID.REQUEST_DOCS;
};

const handleSaveDaft = async () => {
  if (
    !(await showDialog(
      "ยืนยันการบันทึกข้อมูล ?",
      'งานของคุณจะถูกย้ายไปยัง Daft\nคลิกปุ่ม \\"ตกลง\\" เพื่อดำเนินการ'
    ))
  )
    return;
  console.error(JSON.stringify(input_data.value.stepper_info_form.step_three));
  const requestSaveDaftBusinessPartnerRegis = {
    form_number: "01700640914000",
    business_partner_register_form: {
      taxpayer_id_number:
        input_data.value.stepper_info_form.step_one?.main_data.tax_number ??
        null, // data.stepper_info_form.step_one?.main_data.tax_number
      name_th:
        input_data.value.register_info_form.customer_info.th.company_name ??
        null, // data.register_info_form.customer_info.th.company_name
      name_en:
        input_data.value.register_info_form.customer_info.en.company_name ??
        null, // data.register_info_form.customer_info.en.company_name
      form_status_id: 1 ?? null, //number
      business_partner_role_id:
        input_data.value.register_info_form.type_register ?? null, // data.register_info_form.type_register //number
      fill_type_id: input_data.value.register_info_form.type_data.data ?? null, // data.register_info_form.type_data.data //number
      company_id: 3, // unknow
      employee_type_id: "1,2", // unknow
      payment_term_id:
        input_data.value.register_info_form.term_data.data ?? null, // data.register_info_form.term_data.data
      registered_user_email: "user@example.com", // unknow
      created_at: "2023-11-10T14:20:12", // auto fill
      created_user_id: 1, // auto fill
      updated_at: "2023-11-12T10:30:45", // auto fill
      updated_user_id: 1, // auto fill
    },

    business_partner_profile_form: {
      business_partner_type_id:
        input_data.value.register_info_form.customer_type_data.data ?? null, // data.customer_type_data.data //number
      business_register_type_id:
        input_data.value.register_info_form.type_register ?? null, //  data.type_register //number
      is_vat_registered:
        input_data.value.register_info_form.tax_register.type ?? null, // data.tax_register.type //number
      is_head_office:
        input_data.value.register_info_form.tax_register.branch ?? null, // data.tax_register.branch //number
      branch_code:
        input_data.value.register_info_form.tax_register.branch_code ?? null, // data.tax_register.branch_code //string
      company_category_id:
        input_data.value.register_info_form.type_business.data ?? null, // data.type_business.data //number
      product_category:
        input_data.value.register_info_form.type_product_service ?? null, // data.type_product_service
      customer_category: "Wholesale", // unknow
      address_th:
        input_data.value.register_info_form.customer_info.th.address ?? null, // data.customer_info.th.address
      province_th_id:
        input_data.value.register_info_form.customer_info.th.province ?? null, // data.customer_info.th.province //number
      district_th_id:
        input_data.value.register_info_form.customer_info.th.district ?? null, // data.customer_info.th.district //number
      subdistrict_th_id:
        input_data.value.register_info_form.customer_info.th.parish ?? null, // data.customer_info.th.parish //number
      postal_code_th_id:
        input_data.value.register_info_form.customer_info.th.zip_code ?? null, // data.customer_info.th.zip_code //number
      address_en:
        input_data.value.register_info_form.customer_info.en.address ?? null, // data.customer_info.en.address
      province_en:
        input_data.value.register_info_form.customer_info.en.province ?? null, // data.customer_info.en.province
      district_en:
        input_data.value.register_info_form.customer_info.en.district ?? null, // data.customer_info.en.district
      subdistrict_en:
        input_data.value.register_info_form.customer_info.en.parish ?? null, // data.customer_info.en.parish
      postal_code_en_id:
        input_data.value.register_info_form.customer_info.en.zip_code ?? null, // data.customer_info.en.zip_code
      contact_name_1:
        input_data.value.register_info_form.items_contects[0]?.name ?? null, // data.items_contects[0]?.name
      contact_mobile_number_1:
        input_data.value.register_info_form.items_contects[0]?.phone ?? null, // data.items_contects[0]?.phone
      contact_email_1:
        input_data.value.register_info_form.items_contects[0]?.email ?? null, // data.items_contects[0]?.email
      contact_name_2:
        input_data.value.register_info_form.items_contects[2]?.name ?? null, // data.items_contects[2]?.name
      contact_mobile_number_2:
        input_data.value.register_info_form.items_contects[2]?.phone ?? null, // data.items_contects[2]?.phone
      contact_email_2:
        input_data.value.register_info_form.items_contects[2]?.email ?? null, // data.items_contects[2]?.email
      contact_name_3:
        input_data.value.register_info_form.items_contects[3]?.name ?? null, // data.items_contects[3]?.name
      contact_mobile_number_3:
        input_data.value.register_info_form.items_contects[3]?.phone ?? null, // data.items_contects[3]?.phone
      contact_email_3:
        input_data.value.register_info_form.items_contects[3]?.email ?? null, // data.items_contects[3]?.email
      bank_account_name:
        input_data.value.register_info_form.bank_info.acc_name_en ?? null, // data.bank_info.acc_name_en
      bank_id: input_data.value.register_info_form.bank_info.bank_name ?? null, // data.bank_info.bank_name //number
      bank_branch:
        input_data.value.register_info_form.bank_info.bank_branch ?? null, // data.bank_info.bank_branch
      bank_account_number:
        input_data.value.register_info_form.bank_info.acc_number ?? null, // data.bank_info.acc_number
      created_at: "2023-11-10T14:20:12", // auto fill
      created_user_id: 1, // auto fill
      updated_at: "2023-11-12T10:30:45", // auto fill
      updated_user_id: 1, // auto fill
    },

    account_information_form: {
      //SETEP ONE
      business_partner_number:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner ?? null, // data.stepper_info_form.step_one?.main_data.business_partner
      vendor_number:
        input_data.value.stepper_info_form.step_one?.main_data.vender_number ??
        null, // data.stepper_info_form.step_one?.main_data.vender_number
      customer_number: "C123", // unknow
      business_partner_group_id:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_gruop_selection ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_gruop_selection //number
      business_partner_category:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_catega ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_catega
      business_partner_role:
        input_data.value.stepper_info_form.step_one?.main_data
          .business_partner_role ?? null, // data.stepper_info_form.step_one?.main_data.business_partner_role
      account_business_partner_type_id:
        input_data.value.stepper_info_form.step_one?.main_data
          .bp_type_selection ?? null, // data.stepper_info_form.step_one?.main_data.bp_type_selection //number
      is_natural_person: input_data.value.stepper_info_form.step_one?.main_data
        .naturel_person
        ? 1
        : 0 ?? null, // data.stepper_info_form.step_one?.main_data.naturel_person   //null ? 0:1
      tax_category:
        input_data.value.stepper_info_form.step_one?.main_data.tax_catega ??
        null, // data.stepper_info_form.step_one?.main_data.tax_catega
      industry:
        input_data.value.stepper_info_form.step_one?.main_data.indutry ?? null, // data.stepper_info_form.step_one?.main_data.indutry
      trading_partner:
        input_data.value.stepper_info_form.step_one?.main_data
          .tarding_partner ?? null, // data.stepper_info_form.step_one?.main_data.tarding_partner
      valid_from:
        input_data.value.stepper_info_form.step_one?.main_data.valid_from ??
        null, // data.stepper_info_form.step_one?.main_data.valid_from
      valid_to:
        input_data.value.stepper_info_form.step_one?.main_data.valid_to ?? null, // data.stepper_info_form.step_one?.main_data.valid_to

      //STEP TWO
      name1_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.one ??
        null, // data.stepper_info_form.step_two?.address_th.name.one
      name2_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.two ??
        null, // data.stepper_info_form.step_two?.address_th.name.two
      name3_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.three ??
        null, // data.stepper_info_form.step_two?.address_th.name.three
      name4_th:
        input_data.value.stepper_info_form.step_two?.address_th.name.four ??
        null, // data.stepper_info_form.step_two?.address_th.name.four
      search_term1_th:
        input_data.value.stepper_info_form.step_two?.address_th.search.one ??
        null, // data.stepper_info_form.step_two?.address_th.search.one
      search_term2_th:
        input_data.value.stepper_info_form.step_two?.address_th.search.two ??
        null, // data.stepper_info_form.step_two?.address_th.search.two
      address1_th:
        input_data.value.stepper_info_form.step_two?.address_th.address.one ??
        null, // data.stepper_info_form.step_two?.address_th.address.one
      address2_th:
        input_data.value.stepper_info_form.step_two?.address_th.address.two ??
        null, // data.stepper_info_form.step_two?.address_th.address.two
      language:
        input_data.value.stepper_info_form.step_two?.country_info.country ??
        null, // data.stepper_info_form.step_two?.country_info.country
      name1_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.one ??
        null, // data.stepper_info_form.step_two?.address_th.name.one
      name2_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.two ??
        null, // data.stepper_info_form.step_two?.address_th.name.two
      name3_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.three ??
        null, // data.stepper_info_form.step_two?.address_th.name.three
      name4_en:
        input_data.value.stepper_info_form.step_two?.address_en.name.four ??
        null, // data.stepper_info_form.step_two?.address_th.name.four
      search_term1_en:
        input_data.value.stepper_info_form.step_two?.address_en.search.one ??
        null, // data.stepper_info_form.step_two?.address_th.search.one
      search_term2_en:
        input_data.value.stepper_info_form.step_two?.address_en.search.two ??
        null, // data.stepper_info_form.step_two?.address_th.search.two
      address1_en:
        input_data.value.stepper_info_form.step_two?.address_en.address.one ??
        null, // data.stepper_info_form.step_two?.address_th.address.one
      address2_en:
        input_data.value.stepper_info_form.step_two?.address_en.address.two ??
        null, // data.stepper_info_form.step_two?.address_th.address.two
      country: "Thailand", // unknow

      //STEP THREE
      branch_description:
        input_data.value.stepper_info_form.step_three?.info.branch_desc ?? null, // data.stepper_info_form.step_three?.info.branch_desc
      default_branch_code:
        input_data.value.stepper_info_form.step_three?.info.branch_code ?? null, // data.stepper_info_form.step_three?.info.branch_code
      branch_name1_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.one ??
        null, //data.stepper_info_form.step_three?.address_th.name.one
      branch_name2_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.two ??
        null, // data.stepper_info_form.step_three?.address_th.name.two
      branch_name3_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.three ??
        null, // data.stepper_info_form.step_three?.address_th.name.three
      branch_name4_th:
        input_data.value.stepper_info_form.step_three?.address_th.name.four ??
        null, // data.stepper_info_form.step_three?.address_th.name.four
      branch_search_term1_th:
        input_data.value.stepper_info_form.step_three?.address_th.search.one ??
        null, // data.stepper_info_form.step_three?.address_th.search.one
      branch_search_term2_th:
        input_data.value.stepper_info_form.step_three?.address_th.search.two ??
        null, // data.stepper_info_form.step_three?.address_th.search.two
      branch_address1_th:
        input_data.value.stepper_info_form.step_three?.address_th.address.one ??
        null, // data.stepper_info_form.step_three?.address_th.address.one
      branch_address2_th:
        input_data.value.stepper_info_form.step_three?.address_th.address.two ??
        null, // data.stepper_info_form.step_three?.address_th.address.two
      branch_province_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .province ?? null, // data.stepper_info_form.step_three?.address_th.location.province //number
      branch_distict_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .district ?? null, // data.stepper_info_form.step_three?.address_th.location.district //number
      branch_subdisticte_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .parish ?? null, // data.stepper_info_form.step_three?.address_th.location.parish  //number
      branch_postal_code_th_id:
        input_data.value.stepper_info_form.step_three?.address_th.location
          .zip_code ?? null, // data.stepper_info_form.step_three?.address_th.location.zip_code //number
      branch_name1_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.one ??
        null, //data.stepper_info_form.step_three?.address_en.name.one
      branch_name2_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.two ??
        null, // data.stepper_info_form.step_three?.address_en.name.two
      branch_name3_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.three ??
        null, // data.stepper_info_form.step_three?.address_en.name.three
      branch_name4_en:
        input_data.value.stepper_info_form.step_three?.address_en.name.four ??
        null, // data.stepper_info_form.step_three?.address_en.name.four
      branch_search_term1_en:
        input_data.value.stepper_info_form.step_three?.address_en.search.one ??
        null, // data.stepper_info_form.step_three?.address_en.search.one
      branch_search_term2_en:
        input_data.value.stepper_info_form.step_three?.address_en.search.two ??
        null, // data.stepper_info_form.step_three?.address_en.search.two
      branch_address1_en:
        input_data.value.stepper_info_form.step_three?.address_en.address.one ??
        null, // data.stepper_info_form.step_three?.address_en.address.one
      branch_address2_en:
        input_data.value.stepper_info_form.step_three?.address_en.address.two ??
        null, // data.stepper_info_form.step_three?.address_en.address.two
      branch_province_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .province ?? null, // data.stepper_info_form.step_three?.address_en.location.province //number
      branch_distict_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .district ?? null, // data.stepper_info_form.step_three?.address_en.location.district  //number
      branch_subdisticte_en:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .parish ?? null, // data.stepper_info_form.step_three?.address_en.location.parish //number
      branch_postal_code_en_id:
        input_data.value.stepper_info_form.step_three?.address_en.location
          .zip_code ?? null, // data.stepper_info_form.step_three?.address_en.location.zip_code //number
      branch_contact_name_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.name
      branch_contact_mobile_number_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.phone
      branch_contact_email_1:
        input_data.value.stepper_info_form.step_three?.contacts?.[0]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[0]?.email
      branch_contact_name_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.name
      branch_contact_mobile_number_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.phone
      branch_contact_email_2:
        input_data.value.stepper_info_form.step_three?.contacts?.[1]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[1]?.email
      branch_contact_name_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.name ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.name
      branch_contact_mobile_number_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.phone ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.phone
      branch_contact_email_3:
        input_data.value.stepper_info_form.step_three?.contacts?.[2]?.email ??
        null, // data.stepper_info_form.step_three?.contacts?.[2]?.email

      //STEP FOUR
      reconciliation_account_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .reconcliation_acct_seletion ?? null, // data.stepper_info_form.step_four?.more_data_one.reconcliation_acct_seletion //number
      instruction_key:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .instruction_key ?? null, // data.stepper_info_form.step_four?.more_data_one.instruction_key
      sort_key:
        input_data.value.stepper_info_form.step_four?.more_data_one.sort_key ??
        null, // data.stepper_info_form.step_four?.more_data_one.sort_key
      check_double_invoice:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .check_double_invoice ?? null, // data.stepper_info_form.step_four?.more_data_one.check_double_invoice
      payment_methods: Array.isArray(
        input_data.value.stepper_info_form.step_four?.more_data_one
          .payment_methodes
      )
        ? input_data.value.stepper_info_form.step_four?.more_data_one.payment_methodes.join(
            ","
          )
        : null, // data.stepper_info_form.step_four?.more_data_one.payment_methodes
      payment_term_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .pyment_term_selection ?? null, // data.stepper_info_form.step_four?.more_data_one.pyment_term_selection //number
      payment_terms_id:
        input_data.value.stepper_info_form.step_four?.more_data_one
          .payment_terms_selection ?? null, // data.stepper_info_form.step_four?.more_data_one.payment_terms_selection // number
      withholding_tax_type_1:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["1"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["1"]
      withholding_tax_code_1:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["1"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["1"]
      subject_to_wht_1:
        input_data.value.stepper_info_form.step_four?.subject_wht?.["1"] ??
        null, // data.stepper_info_form.step_four?.subject_wht?.["1"]
      type_of_recipient_1:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["1"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["1"]
      withhold_agent_1:
        input_data.value.stepper_info_form.step_four?.with_agent?.["1"] ?? null, // data.stepper_info_form.step_four?.with_agent?.["1"]
      obligation_from_1:
        input_data.value.stepper_info_form.step_four?.obli_from?.["1"] ?? null, // data.stepper_info_form.step_four?.obli_from?.["1"]
      obligation_to_1:
        input_data.value.stepper_info_form.step_four?.obli_to?.["1"] ?? null, // data.stepper_info_form.step_four?.obli_to?.["1"]
      withholding_tax_type_2:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["2"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["2"]
      withholding_tax_code_2:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["2"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["2"]
      subject_to_wht_2:
        input_data.value.stepper_info_form.step_four?.subject_wht?.[2] ?? null, // data.stepper_info_form.step_four?.subject_wht?.[2]
      type_of_recipient_2:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["2"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["2"]
      withhold_agent_2:
        input_data.value.stepper_info_form.step_four?.with_agent?.["2"] ?? null, // data.stepper_info_form.step_four?.with_agent?.["2"]
      obligation_from_2:
        input_data.value.stepper_info_form.step_four?.obli_from?.["2"] ?? null, // data.stepper_info_form.step_four?.obli_from?.["2"]
      obligation_to_2:
        input_data.value.stepper_info_form.step_four?.obli_to?.["2"] ?? null, // data.stepper_info_form.step_four?.obli_to?.["2"]
      withholding_tax_type_3:
        input_data.value.stepper_info_form.step_four?.with_tax_type?.["3"] ??
        null, // data.stepper_info_form.step_four?.with_tax_type?.["3"]
      withholding_tax_code_3:
        input_data.value.stepper_info_form.step_four?.with_tax_code?.["3"] ??
        null, // data.stepper_info_form.step_four?.with_tax_code?.["3"]
      subject_to_wht_3:
        input_data.value.stepper_info_form.step_four?.subject_wht?.["3"] ??
        null, // data.stepper_info_form.step_four?.subject_wht?.["3"]
      type_of_recipient_3:
        input_data.value.stepper_info_form.step_four?.type_reciepient?.["3"] ??
        null, // data.stepper_info_form.step_four?.type_reciepient?.["3"]
      purchase_organization:
        input_data.value.stepper_info_form.step_four?.vander_info.pruch ?? null, // data.stepper_info_form.step_four?.vander_info.pruch
      order_currency:
        input_data.value.stepper_info_form.step_four?.vander_info
          .order_currency ?? null, // data.stepper_info_form.step_four?.vander_info.order_currency
      gr_base_invoice_verif:
        input_data.value.stepper_info_form.step_four?.gb_base ?? null, // data.stepper_info_form.step_four?.gb_base
      long_text_general: "This is a long general text.", //unknow
      house_bank: "BankXYZ" ?? null, //unknow
      long_text_company: "This is a long company text.", //unknow
      saleperson: "SalesPerson123", //unknow
      telephone: "1234567890", //unknow
      customer: "CustomerXYZ", //unknow
      head_office:
        input_data.value.stepper_info_form.step_four?.vander_info.head_office ??
        null, // data.stepper_info_form.step_four?.vander_info.head_office
      payee_in_doc:
        input_data.value.stepper_info_form.step_four?.vander_info
          .pa_yee_in_doc ?? null, // data.stepper_info_form.step_four?.vander_info.pa_yee_in_doc
    },
  };
  console.warn(JSON.stringify(requestSaveDaftBusinessPartnerRegis));
  try {
    const response = await PartnerServive.createDaftBusinessPartnerRegisterForm(
      requestSaveDaftBusinessPartnerRegis
    );
    if (response.data.is_success) {
      router.push({
        name: "AccountManagement",
        query: { path: "DaftTask" },
      });
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

const handleReqDocumentBack = () => {
  is_id_form.value = FORM_ID.REGISTER_INFO;
};

const handleReqDocumentCommit = () => {
  is_id_form.value = FORM_ID.REGISTER_INFO;
};

onMounted(async () => {
  await getRegisterFormDetail(acc_id.value);
});
</script>

<style scoped>
.custom-app-bar {
  height: 79px !important; /* Set your desired height */
}
</style>
