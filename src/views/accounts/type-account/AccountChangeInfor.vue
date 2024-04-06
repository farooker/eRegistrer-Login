<template>
  <v-container fuild>
    <div style="margin-left: 150px; margin-right: 150px">
      <v-app-bar class="custom-app-bar" v-if="itemsFileDocument.length > 0">
        <AttachedMenat
          :items="itemsFileDocument"
          class="mb-9"
          @on-attach-file="handleAttchFiles"
          app
        />
      </v-app-bar>
      <div class="d-flex justify-end mb-5 mt-5">
        <ButtonControl
          icon="mdi mdi-file-document"
          class="mr-2"
          text="ขอเอกสารเพิ่มเติม"
          @click="handleSwitchToRewwuestDoc"
        />
        <ButtonControl
          @click="handleOnDaftSave"
          icon="mdi mdi-content-save-cog"
          text="Save Daft"
        />
      </div>

      <div v-show="is_id_form === FORM_ID.REQUEST_DOCS">
        <RequestDocument
          @on-back="handleReqDocumentBack"
          @on-commit-data="handleReqDocumentCommit"
        />
      </div>

      <div v-show="is_id_form === FORM_ID.CHANGE_INFO">
        <bank-account
          v-if="isBankInfo"
          :partner-name="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]
                  ?.business_partner_name
              : ''
          "
          :partner-number="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]
                  ?.business_partner_number
              : ''
          "
          :account-name="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]
                  ?.bank_account_name
              : ''
          "
          :account-holder="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]?.bank
                  ?.bank_account_holder
              : ''
          "
          :bank-key="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]?.bank?.bank_key
              : ''
          "
          :re-mark="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]?.remark
              : ''
          "
          @on-update="handleBankAccountUpdate"
        />
        <add-branch
          v-if="isAddBranchInfo"
          :add-branch-info="
            dataChangeInfoRequest.add_branch_information
              ? dataChangeInfoRequest.add_branch_information[0]
              : null
          "
          @on-data-update="handleBranchUpdate"
        />
        <change-address
          v-if="isChangeAddressInfo"
          :change-address="
            dataChangeInfoRequest.change_address_information
              ? dataChangeInfoRequest.change_address_information[0]
              : null
          "
          @on-data-update="handleAddressUpdate"
        />
        <change-name
          v-if="isChangeNameInfo"
          :change-name-infomation="
            dataChangeInfoRequest.change_name_information
              ? dataChangeInfoRequest.change_name_information[0]
              : null
          "
          @on-data-update="handleChangeName"
        />
        <contact-information
          v-if="isChangeContactInfo"
          :partner-name="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]
                  ?.business_partner_name
              : ''
          "
          :partner-number="
            dataChangeInfoRequest.change_bank_information
              ? dataChangeInfoRequest.change_bank_information[0]
                  ?.business_partner_number
              : ''
          "
          :change-address="
            dataChangeInfoRequest.change_address_information
              ? dataChangeInfoRequest.change_address_information[0]
              : null
          "
          :items-contact="
            dataChangeInfoRequest.change_contact_information
              ? dataChangeInfoRequest.change_contact_information
              : []
          "
          @on-data-update="handleItemsContactUpdate"
        />
        <div class="d-flex justify-center">
          <ButtonControl
            @click="handleOnClick"
            icon="mdi mdi-content-save-cog"
            text="บันทึก"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import PartnerServive from "@/apis/PartnerServive";
import RequestDocument from "@/components/forms/accounts/RequestDocument.vue";
import AttachedMenat from "@/components/forms/accounts/AttachedMenat.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import BankAccount from "@/components/forms/accounts/extend-action/BankAccount.vue";
import AddBranch from "@/components/forms/accounts/extend-action/AddBranch.vue";
import ChangeAddress from "@/components/forms/accounts/extend-action/ChangeAddress.vue";
import ChangeName from "@/components/forms/accounts/extend-action/ChangeName.vue";
import ContactInformation from "@/components/forms/accounts/extend-action/ContactInformation.vue";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Enum from "@/utils/enum.util";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";

const { handlingErrorsMessage } = useErrorHandlingDialog();
const { showDialog } = useConfirmationDialog();

const router = useRouter();
const route = useRoute();

const form_number = route.query.form_number;
const dataChangeInfoRequest = ref({});
const attachFiles = ref([]);
const itemsFileDocument = ref([]);
const FORM_ID = {
  CHANGE_INFO: 0,
  REQUEST_DOCS: 1,
};

const is_id_form = ref(FORM_ID.CHANGE_INFO);

onMounted(async () => {
  await getChangeInfomationRequestByFormNumber();
  await getUploadDocumentByFormNumber();
});

const getUploadDocumentByFormNumber = async () => {
  try {
    const response = await PartnerServive.getUploadDocumentByFormNumber(
      form_number
    );
    if (response.data?.is_success) {
      itemsFileDocument.value = response.data.data.map((el) => {
        return {
          file: null,
          file_name: el.document_name,
          file_size: "no available",
        };
      });
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

const isBankInfo = computed(() => {
  if (dataChangeInfoRequest.value.changed_part)
    return dataChangeInfoRequest.value.changed_part.some(
      (el) => el.id == Enum.ChangePartForm.BANK_INFO
    );
  return false;
});

const isAddBranchInfo = computed(() => {
  if (dataChangeInfoRequest.value.changed_part)
    return dataChangeInfoRequest.value.changed_part.some(
      (el) => el.id == Enum.ChangePartForm.ADD_BRANCH
    );
  return false;
});

const isChangeAddressInfo = computed(() => {
  if (dataChangeInfoRequest.value.changed_part)
    return dataChangeInfoRequest.value.changed_part.some(
      (el) => el.id == Enum.ChangePartForm.ADDRESS_INFO
    );
  return false;
});

const isChangeNameInfo = computed(() => {
  if (dataChangeInfoRequest.value.changed_part)
    return dataChangeInfoRequest.value.changed_part.some(
      (el) => el.id == Enum.ChangePartForm.NAME_INFO
    );
  return false;
});

const isChangeContactInfo = computed(() => {
  if (dataChangeInfoRequest.value.changed_part)
    return dataChangeInfoRequest.value.changed_part.some(
      (el) => el.id == Enum.ChangePartForm.CONTACT_INFO
    );
  return false;
});

const handleAttchFiles = (item_files) => {
  attachFiles.value = item_files;
};

const itemsChangeInfo = ref({
  change_bank_information: null,
  change_name_information: null,
  add_branch_information: null,
  change_address_information: null,
  change_contact_information: null,
});

// const itemsChangeInfo = ref({
//   change_bank_information: {
//     partner_number: "BP123456-Partner-Number",
//     partner_name: "ธุรกิจทดสอบ-Partner-Name",
//     bank_account: "Bank-Account",
//     account_holder: "SCB-Account-Hoder",
//     account_name: "Account-Name",
//     bank_key: "025",
//     remark: "เพิ่ม",
//   },
//   change_name_information: {
//     partner_number: "BP123456",
//     name_th_1: "บริษัท ทดสอบ",
//     name_th_2: "จำกัด",
//     name_th_3: "fefeffef",
//     name_th_4: "ควายรีน",
//     name_en_1: "Test Company",
//     name_en_2: "Company",
//     name_en_3: "Ltd.",
//     name_en_4: "Reen",
//     search_term_en: "Test",
//     search_term_th: "ทดสอบ",
//     new_name_th_1: "",
//     new_name_th_2: "",
//     new_name_th_3: "",
//     new_name_th_4: "",
//     new_name_en_1: "",
//     new_name_en_2: "",
//     new_name_en_3: "",
//     new_search_term_th: "",
//     new_search_term_en: "",
//   },
//   add_branch_information: {
//     partner_number: "BP123456",
//     role: "role",
//     name_1_th: "บริษัท ทดสอบ จำกัด",
//     name_2_th: "สาขาหลัก",
//     name_3_th: "",
//     name_4_th: "",
//     search_term_1_th: "ทดสอบ",
//     name_1_en: "Test Company Ltd.",
//     name_2_en: "Main Branch",
//     name_3_en: "",
//     name_4_en: "",
//     address: {
//       province: 65,
//       district: 179,
//       parish: 3692,
//       zip_code: 7537,
//     },
//     search_term_1_en: "Test",
//     address_1_th: "123 ถนนสุขุมวิท แขวงคลองตัน",
//     address_2_th: "เขตคลองเตย กรุงเทพ",
//     address_1_en: "123 Sukhumvit Road, Khlong Tan",
//     address_2_en: "Khlong Toei, Bangkok",
//     branch_code: "00001",
//     branch_description: "Main Branch",
//   },
//   change_address_information: {
//     partner_number: "BP123456",
//     name_1_th: "บริษัท ทดสอบ จำกัด",
//     name_2_th: "สาขาหลัก",
//     name_3_th: "",
//     name_4_th: "",
//     name_1_en: "Test Company Ltd.",
//     name_2_en: "Main Branch",
//     name_3_en: "",
//     name_4_en: "",
//     address_1_th: "456 ถนนสุขุมวิท แขวงคลองตัน",
//     address_2_th: "เขตคลองเตย กรุงเทพ",
//     address_1_en: "456 Sukhumvit Road, Khlong Tan",
//     address_2_en: "Khlong Toei, Bangkok",
//     address: {
//       province: 65,
//       district: 179,
//       parish: 3692,
//       zip_code: 7537,
//     },
//     branch_code: "00001",
//     branch_description: "Main Branch",
//   },
//   change_contact_information: {
//     partner_name: "ธุรกิจทดสอบ",
//     partner_number: "",
//     branch_code: "00001",
//     contact_name_1: "John Doe",
//     telephone_1: "1234567890",
//     email_1: "john.doe@example.com",
//     comments_1: "",
//     remark_1: "เพิ่ม",
//     contact_name_2: "John Dev",
//     telephone_2: "1234567890",
//     email_2: "john.dev@example.com",
//     comments_2: "",
//     remark_2: "ยกเลิก",
//     branch_description: "Main Branch",
//   },
// });

const handleBankAccountUpdate = (dataUpdate) => {
  itemsChangeInfo.value.change_bank_information = dataUpdate;
};

const handleChangeName = (dataUpdated) => {
  itemsChangeInfo.value.change_name_information = dataUpdated;
};

const handleBranchUpdate = (dataUpdated) => {
  itemsChangeInfo.value.add_branch_information = dataUpdated;
};

const handleAddressUpdate = (dataUpdated) => {
  itemsChangeInfo.value.change_address_information = dataUpdated;
  console.log(JSON.stringify(itemsChangeInfo.value.change_address_information))
};

const handleItemsContactUpdate = (dataUpdated) => {
  itemsChangeInfo.value.change_contact_information = dataUpdated;
};

const getChangeInfomationRequestByFormNumber = async () => {
  try {
    const response =
      await PartnerServive.getChangeInfomationRequestByFormNumber(form_number);
    if (response.data?.is_success) {
      dataChangeInfoRequest.value = response.data?.data;
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

const handleSwitchToRewwuestDoc = () => {
  is_id_form.value = FORM_ID.REQUEST_DOCS;
};

const handleReqDocumentBack = () => {
  is_id_form.value = FORM_ID.CHANGE_INFO;
};

const handleReqDocumentCommit = () => {
  is_id_form.value = FORM_ID.CHANGE_INFO;
};

const handleOnDaftSave = async () => {
  if (
    await showDialog(
      "ยืนยันการบันถึงข้อมูล ?",
      "การ save daft งานของคุณจะไปอยู่ใน daft\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
    )
  ) {
    const daftChangeInfoBody = {
      bp_number: dataChangeInfoRequest.value.bp_number,
      changed_part_id: "", //unknow
      change_bank_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_bank_information.partner_number,
          business_partner_name:
            itemsChangeInfo.value.change_bank_information.partner_name,
          bank_account_name:
            itemsChangeInfo.value.change_bank_information.account_name,
          bank_id: "", //unknow
          bank_key: itemsChangeInfo.value.change_bank_information.bank_key,
          bank_account_holder:
            itemsChangeInfo.value.change_bank_information.account_holder,
          bank_branch: itemsChangeInfo.value.change_bank_information,
          bank_account_number:
            itemsChangeInfo.value.change_bank_information.bank_account,
          remark: itemsChangeInfo.value.change_bank_information.remark,
        },
      ],
      change_name_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_name_information.partner_number,
          business_partner_name: "", //unknow
          name_th: itemsChangeInfo.value.change_name_information.new_name_th_1,
          name_en: itemsChangeInfo.value.change_name_information.new_name_en_1,
        },
      ],
      add_branch_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.add_branch_information.partner_number,
          branch_code: itemsChangeInfo.value.add_branch_information.branch_code,
          branch_description:
            itemsChangeInfo.value.add_branch_information.branch_description,
          business_partner_role_id:
            itemsChangeInfo.value.add_branch_information.role, //not sure -> it business_partner_role_id
          name1_th: itemsChangeInfo.value.add_branch_information.name_1_th,
          name2_th: itemsChangeInfo.value.add_branch_information.name_2_th,
          name3_th: itemsChangeInfo.value.add_branch_information.name_3_th,
          name4_th: itemsChangeInfo.value.add_branch_information.name_4_th,
          search_term1_th:
            itemsChangeInfo.value.add_branch_information.search_term_1_th,
          address_th: "", //unknow
          address1_th:
            itemsChangeInfo.value.add_branch_information.address_1_th,
          address2_th:
            itemsChangeInfo.value.add_branch_information.address_2_th,
          province_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.province,
          district_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.district,
          subdistrict_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.parish,
          postal_code_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.zip_code,
          name1_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name2_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name3_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name4_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          search_term1_en:
            itemsChangeInfo.value.add_branch_information.search_term_1_en,
          address_en: "", //unknow
          address1_en:
            itemsChangeInfo.value.add_branch_information.address_1_en,
          address2_en:
            itemsChangeInfo.value.add_branch_information.address_2_en,
          province_en:
            itemsChangeInfo.value.add_branch_information.addressEn.province, //not sure -> province in eng
          district_en:
            itemsChangeInfo.value.add_branch_information.addressEn.district, //not sure -> district in eng
          subdistrict_en:
            itemsChangeInfo.value.add_branch_information.addressEn.parish, //not sure -> parish in eng
          postal_code_en_id:
            itemsChangeInfo.value.add_branch_information.addressEn.zip_code, //not sure -> zip_code in eng
          country: "TH", //unknow
        },
      ],
      change_address_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_address_information.partner_number,
          branch_code:
            itemsChangeInfo.value.change_address_information.branch_code,
          branch_description:
            itemsChangeInfo.value.change_address_information.branch_description,
          name1_th: itemsChangeInfo.value.change_address_information.name_1_th,
          name2_th: itemsChangeInfo.value.change_address_information.name_2_th,
          name3_th: itemsChangeInfo.value.change_address_information.name_3_th,
          name4_th: itemsChangeInfo.value.change_address_information.name_4_th,
          search_term1_th: "", //unknow
          address_th: "", //unknow
          address1_th:
            itemsChangeInfo.value.change_address_information.address_1_th,
          address2_th:
            itemsChangeInfo.value.change_address_information.address_2_th,
          province_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.province,
          district_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.district,
          subdistrict_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.parish,
          postal_code_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.zip_code,
          name1_en: itemsChangeInfo.value.change_address_information.name_1_en,
          name2_en: itemsChangeInfo.value.change_address_information.name_2_en,
          name3_en: itemsChangeInfo.value.change_address_information.name_3_en,
          name4_en: itemsChangeInfo.value.change_address_information.name_4_en,
          search_term1_en: "", //unknow
          address_en: "", //unknow
          address1_en:
            itemsChangeInfo.value.change_address_information.address_1_en,
          address2_en:
            itemsChangeInfo.value.change_address_information.address_2_en,
          province_en:
            itemsChangeInfo.value.add_branch_information.addressEn.province, //not sure -> province in eng
          district_en:
            itemsChangeInfo.value.add_branch_information.addressEn.district, //not sure -> district in eng
          subdistrict_en:
            itemsChangeInfo.value.add_branch_information.addressEn.parish, //not sure -> parish in eng
          postal_code_en_id:
            itemsChangeInfo.value.add_branch_information.addressEn.zip_code, //not sure -> zip_code in eng
          country: "TH", //unknow
        },
      ],
      change_contact_information: [],
    };

    daftChangeInfoBody.change_contact_information.push({
      business_partner_number:
        itemsChangeInfo.value.change_contact_information.partner_number,
      branch_code: itemsChangeInfo.value.change_contact_information.branch_code,
      business_partner_name:
        itemsChangeInfo.value.change_contact_information.partner_name,
      name: itemsChangeInfo.value.change_contact_information.contact_name_1,
      mobile_number:
        itemsChangeInfo.value.change_contact_information.telephone_1,
      email: itemsChangeInfo.value.change_contact_information.email_1,
      remark: itemsChangeInfo.value.change_contact_information.remark_1,
    });

    daftChangeInfoBody.change_contact_information.push({
      business_partner_number:
        itemsChangeInfo.value.change_contact_information.partner_number,
      branch_code: itemsChangeInfo.value.change_contact_information.branch_code,
      business_partner_name:
        itemsChangeInfo.value.change_contact_information.partner_name,
      name: itemsChangeInfo.value.change_contact_information.contact_name_2,
      mobile_number:
        itemsChangeInfo.value.change_contact_information.telephone_2,
      email: itemsChangeInfo.value.change_contact_information.email_2,
      remark: itemsChangeInfo.value.change_contact_information.remark_2,
    });

    console.warn(JSON.stringify(daftChangeInfoBody));
    // router.push({
    //   name: "AccountManagement",
    //   query: { path: "DaftTask" },
    // });
  }
};

const handleOnClick = async () => {
  if (
    await showDialog(
      "ยืยยันการแก้ไขข้อมูล ?",
      "กรุณาตรวจสอบข้อมูล คุณไม่สามารถแก้ไขได้แล้ว\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
    )
  ) {

    const daftChangeInfoBody = {
      bp_number: dataChangeInfoRequest.value.bp_number,
      changed_part_id: "", //unknow
      change_bank_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_bank_information.partner_number,
          business_partner_name:
            itemsChangeInfo.value.change_bank_information.partner_name,
          bank_account_name:
            itemsChangeInfo.value.change_bank_information.account_name,
          bank_id: "", //unknow
          bank_key: itemsChangeInfo.value.change_bank_information.bank_key,
          bank_account_holder:
            itemsChangeInfo.value.change_bank_information.account_holder,
          bank_branch: itemsChangeInfo.value.change_bank_information,
          bank_account_number:
            itemsChangeInfo.value.change_bank_information.bank_account,
          remark: itemsChangeInfo.value.change_bank_information.remark,
        },
      ],
      change_name_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_name_information.partner_number,
          business_partner_name: "", //unknow
          name_th: itemsChangeInfo.value.change_name_information.new_name_th_1,
          name_en: itemsChangeInfo.value.change_name_information.new_name_en_1,
        },
      ],
      add_branch_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.add_branch_information.partner_number,
          branch_code: itemsChangeInfo.value.add_branch_information.branch_code,
          branch_description:
            itemsChangeInfo.value.add_branch_information.branch_description,
          business_partner_role_id:
            itemsChangeInfo.value.add_branch_information.role, //not sure -> it business_partner_role_id
          name1_th: itemsChangeInfo.value.add_branch_information.name_1_th,
          name2_th: itemsChangeInfo.value.add_branch_information.name_2_th,
          name3_th: itemsChangeInfo.value.add_branch_information.name_3_th,
          name4_th: itemsChangeInfo.value.add_branch_information.name_4_th,
          search_term1_th:
            itemsChangeInfo.value.add_branch_information.search_term_1_th,
          address_th: "", //unknow
          address1_th:
            itemsChangeInfo.value.add_branch_information.address_1_th,
          address2_th:
            itemsChangeInfo.value.add_branch_information.address_2_th,
          province_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.province,
          district_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.district,
          subdistrict_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.parish,
          postal_code_th_id:
            itemsChangeInfo.value.add_branch_information.addressTh.zip_code,
          name1_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name2_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name3_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          name4_en: itemsChangeInfo.value.add_branch_information.name_1_en,
          search_term1_en:
            itemsChangeInfo.value.add_branch_information.search_term_1_en,
          address_en: "", //unknow
          address1_en:
            itemsChangeInfo.value.add_branch_information.address_1_en,
          address2_en:
            itemsChangeInfo.value.add_branch_information.address_2_en,
          province_en:
            itemsChangeInfo.value.add_branch_information.addressEn.province, //not sure -> province in eng
          district_en:
            itemsChangeInfo.value.add_branch_information.addressEn.district, //not sure -> district in eng
          subdistrict_en:
            itemsChangeInfo.value.add_branch_information.addressEn.parish, //not sure -> parish in eng
          postal_code_en_id:
            itemsChangeInfo.value.add_branch_information.addressEn.zip_code, //not sure -> zip_code in eng
          country: "TH", //unknow
        },
      ],
      change_address_information: [
        {
          business_partner_number:
            itemsChangeInfo.value.change_address_information.partner_number,
          branch_code:
            itemsChangeInfo.value.change_address_information.branch_code,
          branch_description:
            itemsChangeInfo.value.change_address_information.branch_description,
          name1_th: itemsChangeInfo.value.change_address_information.name_1_th,
          name2_th: itemsChangeInfo.value.change_address_information.name_2_th,
          name3_th: itemsChangeInfo.value.change_address_information.name_3_th,
          name4_th: itemsChangeInfo.value.change_address_information.name_4_th,
          search_term1_th: "", //unknow
          address_th: "", //unknow
          address1_th:
            itemsChangeInfo.value.change_address_information.address_1_th,
          address2_th:
            itemsChangeInfo.value.change_address_information.address_2_th,
          province_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.province,
          district_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.district,
          subdistrict_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.parish,
          postal_code_th_id:
            itemsChangeInfo.value.change_address_information.addressTh.zip_code,
          name1_en: itemsChangeInfo.value.change_address_information.name_1_en,
          name2_en: itemsChangeInfo.value.change_address_information.name_2_en,
          name3_en: itemsChangeInfo.value.change_address_information.name_3_en,
          name4_en: itemsChangeInfo.value.change_address_information.name_4_en,
          search_term1_en: "", //unknow
          address_en: "", //unknow
          address1_en:
            itemsChangeInfo.value.change_address_information.address_1_en,
          address2_en:
            itemsChangeInfo.value.change_address_information.address_2_en,
          province_en:
            itemsChangeInfo.value.add_branch_information.addressEn.province, //not sure -> province in eng
          district_en:
            itemsChangeInfo.value.add_branch_information.addressEn.district, //not sure -> district in eng
          subdistrict_en:
            itemsChangeInfo.value.add_branch_information.addressEn.parish, //not sure -> parish in eng
          postal_code_en_id:
            itemsChangeInfo.value.add_branch_information.addressEn.zip_code, //not sure -> zip_code in eng
          country: "TH", //unknow
        },
      ],
      change_contact_information: [],
    };

    daftChangeInfoBody.change_contact_information.push({
      business_partner_number:
        itemsChangeInfo.value.change_contact_information.partner_number,
      branch_code: itemsChangeInfo.value.change_contact_information.branch_code,
      business_partner_name:
        itemsChangeInfo.value.change_contact_information.partner_name,
      name: itemsChangeInfo.value.change_contact_information.contact_name_1,
      mobile_number:
        itemsChangeInfo.value.change_contact_information.telephone_1,
      email: itemsChangeInfo.value.change_contact_information.email_1,
      remark: itemsChangeInfo.value.change_contact_information.remark_1,
    });

    daftChangeInfoBody.change_contact_information.push({
      business_partner_number:
        itemsChangeInfo.value.change_contact_information.partner_number,
      branch_code: itemsChangeInfo.value.change_contact_information.branch_code,
      business_partner_name:
        itemsChangeInfo.value.change_contact_information.partner_name,
      name: itemsChangeInfo.value.change_contact_information.contact_name_2,
      mobile_number:
        itemsChangeInfo.value.change_contact_information.telephone_2,
      email: itemsChangeInfo.value.change_contact_information.email_2,
      remark: itemsChangeInfo.value.change_contact_information.remark_2,
    });

    console.log(JSON.stringify(daftChangeInfoBody))

    // router.push({
    //   name: "AccountManagement",
    //   query: { path: "ExportTask" },
    // });
  }
};
</script>

<style>
.custom-app-bar {
  height: 79px !important;
}
</style>
