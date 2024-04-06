import axiosBase from "./AxiosConfig";

const getPaymentTermAll = async (
  offset = 0,
  limit = 1000,
  sort_by = "id:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-payment-terms?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const createPaymentTerm = async (
  business_partner_role_id,
  code,
  description
) => {
  return await axiosBase({
    method: "post",
    url: "/master/create-payment-term",
    data: {
      business_partner_role_id,
      code,
      description,
      created_user_id: 1,
    },
  });
};

export default {
  getPaymentTermAll,
  createPaymentTerm,
};
