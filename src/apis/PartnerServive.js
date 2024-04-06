import axiosBase from "./AxiosConfig";
const getBusinessPartnerDetail = async (_bp_number) => {
  return await axiosBase({
    method: "post",
    url: `/partner/get-business-partner-detail`,
    data: {
      bp_number: _bp_number,
    },
  });
};
const getBusinessPartnerDetailBranchCode = async (_bp_number, _branch_code) => {
  return await axiosBase({
    method: "post",
    url: `/partner/get-business-partner-detail`,
    data: {
      bp_number: _bp_number,
      branch_code: _branch_code,
    },
  });
};

const getPartnerTypeAll = async (
  offset = 0,
  limit = 1000,
  sort_by = "id:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-business-partner-types?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getExtendCompanyRequestByFormNumber = async (form_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-extend-company-request-by-form-number/${form_number}`,
    data: {},
  });
};

const getExtendRoleRequestByFormNumber = async (form_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-extend-role-request-by-form-number/${form_number}`,
    data: {},
  });
};

const getExtendCompanyBplRequestByFormNumber = async (form_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-business-partner-by-bp-number/${form_number}`,
    data: {},
  });
};

const getBranchListByPbNumber = async (bp_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-branches-by-bp-number/${bp_number}`,
    data: {},
  });
};

const createExtendCompany = async (body) => {
  return await axiosBase({
    method: "post",
    url: "/partner/extend-company",
    data: {
      ...body,
      updated_user_id: 1,
    },
  });
};
const createDraftExtendRole = async (body) => {
  return await axiosBase({
    method: "post",
    url: "/partner/save-draft-extend-business-partner-role",
    data: {
      ...body,
      updated_user_id: 1,
    },
  });
};

const createExtendRole = async (body) => {
  return await axiosBase({
    method: "post",
    url: "/partner/extend-business-partner-role",
    data: {
      ...body,
      updated_user_id: 1,
    },
  });
};

const getSearchBusinessPartner = async (
  offset = 0,
  limit = 1000,
  search_field,
  search_value,
  company_id,
  pb_role_id,
  bu_id,
  is_fpt_affiliate,
  bp_type_id,
  completed_from,
  completed_to,
  company_category_id
) => {
  let url = `/partner/search-business-partner?offset=${offset}&limit=${limit}&company_id=${company_id}&pb_role_id=${pb_role_id}&bu_id=${bu_id}&is_fpt_affiliate=${is_fpt_affiliate}&bp_type_id=${bp_type_id}&completed_from=${completed_from}&completed_to=${completed_to}&company_category_id=${company_category_id}`;

  // Check if search_value is not null or undefined
  if (search_value !== null && search_value !== undefined) {
    url += `&search_field=${search_field}&search_value=${search_value}`;
  }

  return await axiosBase({
    method: "get",
    url,
    data: {},
  });
};

const getBusinessPartnerRolesAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-business-partner-roles`,
    data: {},
  });
};

const getBusinessPartnerGroupAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-business-partner-groups`,
    // headers: {
    //   "Content-Type": "charset=UTF-8"
    // },
    data: {},
  });
};

const getAccounrBusinessPartnerTypeAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-account-business-partner-types`,
    data: {},
  });
};

const getDocumentRequiresByInfo = async (
  business_partner_role_id,
  business_partner_type_id,
  is_vat_registered,
  is_filled_book_bank,
  company_ids = []
) => {
  return await axiosBase({
    method: "post",
    url: "/partner/get-required-documents",
    data: {
      business_partner_role_id,
      business_partner_type_id,
      is_vat_registered,
      is_filled_book_bank,
      company_id: company_ids.join(","),
    },
  });
};

const createBusinessPartnerType = async (
  name_th,
  name_en,
  is_natural_person
) => {
  return await axiosBase({
    method: "post",
    url: "/master/create-business-partner-type",
    data: {
      name_th: name_th,
      name_en: name_en,
      is_natural_person: is_natural_person,
      created_user_id: 1,
    },
  });
};

const createBusinessPartnerProfileForm = async (body = {}) => {
  // console.log({ ...body, created_user_id: 1 });
  return await axiosBase({
    method: "post",
    url: "/partner/create-business-partner-profile-form",
    data: { ...body, created_user_id: 1 },
  });
};

const getRegisterFormDetail = async (form_number) => {
  return await axiosBase({
    method: "post",
    url: "/partner/get-register-form-detail",
    data: { form_number },
  });
};

const getChangeInfomationRequestByFormNumber = async (form_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-change-information-request-by-form-number/${form_number}`,
    data: {},
  });
};

const getBusinessPartnerRegisterForm = async (form_number) => {
  return await axiosBase({
    method: "post",
    url: "/partner/get-business-partner-register-form",
    data: { form_number },
  });
};

const createUploadDocuments = async (form_number, datatDocuments = []) => {
  return await axiosBase({
    method: "post",
    url: "/partner/create-uploaded-documents",
    data: { form_number, document: datatDocuments, created_user_id: 1 },
  });
};

const createChangeInformation = async (data = {}) => {
  return await axiosBase({
    method: "post",
    url: "/partner/get-business-partner-register-form",
    data: { ...data, created_user_id: 1 },
  });
};

const createDaftBusinessPartnerRegisterForm = async (data = {}) => {
  return await axiosBase({
    method: "post",
    url: "/partner/save-draft-new-register-form",
    data: { ...data, updated_user_id: 1 },
  });
};

const createSaveBusinessPartnerRegisterForm = async (data = {}) => {
  return await axiosBase({
    method: "post",
    url: "/partner/save-new-registration",
    data: { ...data, updated_user_id: 1 },
  });
};

const getUploadDocumentByFormNumber = async (formNumber) => {
  return await axiosBase({
    method: "post",
    url: "/partner/get-uploaded-documents",
    data: { form_number: formNumber },
  });
};

const getBusinessPartnerChangInfo = async (_bp_number) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-business-partner-by-bp-number/${_bp_number}`,
  });
};

const createChangInfo = async (databody) => {
  return await axiosBase({
    method: "post",
    url: "/partner/create-change-information-request",
    data: {
      ...databody,
      // registered_user_email: "co3@co.co",
      created_user_id: 1
    },
  });

};

export default {
  getBusinessPartnerDetail,
  getBusinessPartnerDetailBranchCode,
  getPartnerTypeAll,
  getSearchBusinessPartner,
  getBusinessPartnerGroupAll,
  getAccounrBusinessPartnerTypeAll,
  getDocumentRequiresByInfo,
  createBusinessPartnerType,
  createBusinessPartnerProfileForm,
  getBusinessPartnerRolesAll,
  getRegisterFormDetail,
  getExtendCompanyRequestByFormNumber,
  getExtendRoleRequestByFormNumber,
  getExtendCompanyBplRequestByFormNumber,
  getChangeInfomationRequestByFormNumber,
  getBusinessPartnerRegisterForm,
  createUploadDocuments,
  createChangeInformation,
  createDaftBusinessPartnerRegisterForm,
  createSaveBusinessPartnerRegisterForm,
  createExtendCompany,
  createDraftExtendRole,
  createExtendRole,
  getBranchListByPbNumber,
  getUploadDocumentByFormNumber,
  getBusinessPartnerChangInfo,
  createChangInfo
};
