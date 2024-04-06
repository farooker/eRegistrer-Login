import axiosBase from "./AxiosConfig";
const getProviceAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-provinces?sort-by=name_th:asc&offset=0&limit=100`,
  });
};

const getDistrictAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-districts?sort-by=name_th:asc&offset=0&limit=900`,
  });
};

const getDistrictByProviceId = async (proviceId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-district/${proviceId}`,
  });
};

const getSubDistrictAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-subdistricts?sort-by=name_th:asc&offset=0&limit=80000`,
  });
};

const getSubDistrictByDistrictId = async (districtId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-subdistrict/${districtId}`,
    headers: {
      Accept: "application/json",
    },
  });
};

const getPostalCodeAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-postal-codes?offset=0&limit=5000&sort-by=id:desc`,
  });
};

const getPostalCodeBySubDirictId = async (subDirictId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-postal-code/${subDirictId}`,
  });
};

const getBanksAll = async (sort) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-banks?sort-by=name_th:${sort}`,
  });
};

const getDocumentType = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-document-types?sort-by=id:desc`,
  });
};

export default {
  getProviceAll,
  getDistrictAll,
  getSubDistrictAll,
  getPostalCodeAll,
  getBanksAll,
  getDocumentType,
  getDistrictByProviceId,
  getSubDistrictByDistrictId,
  getPostalCodeBySubDirictId,
};
