import axiosBase from "./AxiosConfig";
const getAccountReconciliationAll= async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-reconciliation-accounts`,
    data: {},
  });
};

export default {
    getAccountReconciliationAll,
  };
  