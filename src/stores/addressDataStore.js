import {defineStore} from 'pinia'
import OtherService from "@/apis/OtherService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

export const useMyAddressStore = defineStore('ADDRESS_STORE', {
    state: () => ({
      provinces: [],
      districts:[],
      subDistricts:[],
      postCodes:[]
    }),
    actions: {
        async getProvince(){
            try {
              const response = await OtherService.getProviceAll();
              if (response.data?.is_success) {
                this.provinces = response.data.data;
              }
            } catch (e) {
              if (e.response) {
                const val = e.response.data;
                handlingErrorsMessage(val.message, val?.data.error);
                return;
              }
              handlingErrorsMessage("unknown", e.message);
            }
          },
          
          async getDistrict() {
            try {
              const response = await OtherService.getDistrictAll();
              if (response.data?.is_success) {
                this.districts = response.data.data;
              }
            } catch (e) {
              if (e.response) {
                const val = e.response.data;
                handlingErrorsMessage(val.message, val?.data.error);
                return;
              }
              handlingErrorsMessage("unknown", e.message);
            }
          },
          
          async getSubDistrict() {
            try {
              const response = await OtherService.getSubDistrictAll();
              if (response.data?.is_success) {
                this.subDistricts = response.data.data;
              }
            } catch (e) {
              if (e.response) {
                const val = e.response.data;
                handlingErrorsMessage(val.message, val?.data.error);
                return;
              }
              handlingErrorsMessage("unknown", e.message);
            }
          },
          
          async getPostCode() {
            try {
              const response = await OtherService.getPostalCodeAll();
              if (response.data?.is_success) {
                this.postCodes = response.data.data;
              }
            } catch (e) {
              if (e.response) {
                const val = e.response.data;
                handlingErrorsMessage(val.message, val?.data.error);
                return;
              }
              handlingErrorsMessage("unknown", e.message);
            }
          },
    },
  });