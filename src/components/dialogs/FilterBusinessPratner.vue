<template>
  <v-menu v-model="menus_dialog" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn class="text-capitalize" color="grey-lighten-2" block height="40" v-bind="props">
        Filter
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-card min-width="1400" elevation="5">
      <v-card-item class="pa-2 mt-2">
        <v-row align-center dense>
          <v-col cols="11">
            <v-row align-center dense>
              <v-col cols="2">
                <v-select v-model="CompaniesId" :loading="loading" density="compact" variant="outlined" placeholder="Company Code" item-title="company_code"
                  :items="selected_items.companies" item-value="id" />
              </v-col>

              <v-col cols="2">
                <v-select v-model="RoleId"  :loading="loading" density="compact" variant="outlined" placeholder="Role" item-title="name" item-value="id"
                  :items="selected_items.role" />
              </v-col>


              <v-col cols="2">
                <v-select v-model="BuOwnersId"  :loading="loading" density="compact" variant="outlined" placeholder="BU Owner" item-title="name_th" item-value="id"
                  :items="selected_items.bu_owners" />
              </v-col>

              <v-col cols="2">
                <v-select v-model="AffiliateId"  :loading="loading" density="compact" variant="outlined" placeholder="FPT_Affiliate" :items="selected_items.affiliate"
                  item-title="affiliate_name" item-value="id" />
              </v-col>


              <v-col cols="2">
                <v-select v-model="PartnerTypeId" :loading="loading" density="compact" variant="outlined" placeholder="Organization Type" item-title="name_th"
                  :items="selected_items.partner_type" item-value="id" />
              </v-col>

              <v-col cols="2">
                <datePickerRangeControl :from="DateFrom" :to="DateTo" @from="DateFrom = $event"
                  @to="DateTo = $event" />
              </v-col>

              <v-col cols="2">
                <v-select v-model="CompCategoriesId"  :loading="loading" density="compact" variant="outlined" placeholder="Company Category"
                  :items="selected_items.comp_categories" item-title="name_th" item-value="id" />
              </v-col>

            </v-row>
          </v-col>
          <v-col cols="1">
            <v-btn class="text-none" variant="text" @click="clearAll">
              <p class="text-decoration-underline">
                Clear all</p>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-menu>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onMounted,computed,defineProps } from 'vue';
import compnayService from '@/apis/CompnayService';
import businessUnitService from '@/apis/BusinessUnitService';
import roleUnitService from '@/apis/RoleService';
import partnerTypeService from '@/apis/PartnerServive';

import datePickerRangeControl from '@/components/controls/DatePickerRangeControl.vue'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["companies_id","role_id","bu_owners_id","affiliate_id","partner_type_id","comp_categories_id","date_from","date_to"]);
const props = defineProps({
  companies_id: {
    type: String,
    default: null,
  },
  role_id: {
    type: String,
    default: null,
  },
  bu_owners_id: {
    type: String,
    default: null,
  },
  affiliate_id: {
    type: String,
    default: null,
  },
  partner_type_id: {
    type: String,
    default: null,
  },
  comp_categories_id: {
    type: String,
    default: null,
  },
  date_from: {
    type: String,
    default: null,
  },
  date_to: {
    type: String,
    default: null,
  },
});

const CompaniesId = computed({
    get() {   return props.companies_id; },
    set(value) {  emit("companies_id", value) }
});

const RoleId = computed({
    get() {   return props.role_id; },
    set(value) {  emit("role_id", value) }
});

const BuOwnersId = computed({
    get() {   return props.bu_owners_id; },
    set(value) {  emit("bu_owners_id", value) }
});
const AffiliateId = computed({
    get() {   return props.affiliate_id; },
    set(value) {  emit("affiliate_id", value) }
});
const PartnerTypeId = computed({
    get() {   return props.partner_type_id; },
    set(value) {  emit("partner_type_id", value) }
});
const CompCategoriesId = computed({
    get() {  return props.comp_categories_id; },
    set(value) {  emit("comp_categories_id", value) }
});
const DateFrom = computed({
    get() {  return props.date_from; },
    set(value) {  emit("date_from", value) }
});
const DateTo = computed({
    get() {  return props.date_to; },
    set(value) {  emit("date_to", value) }
});

const menus_dialog = ref(false);
const selected_items = ref({
  companies: [],
  role: [],
  partner_type:[],
  bu_owners: [],
  affiliate: [
    {
      affiliate_id: 1,
      affiliate_name: 'Yes'
    },
    {
      affiliate_id: 0,
      affiliate_name: 'No'
    },
  ],
  // status: ['initial', 'inprogress', 'completed'],
  comp_categories: []
});
const loading = ref(false);
// const loading = ref({
//   companies: false,
//   comp_categories: false,
//   businesUnit: false
// })


onMounted(async () => {
  loading.value = true;
  const promise1 = await getCompanies();
  const promise2 = await getBusinessUnit();
  const promise3 = await getCompaniesCategories();
  const promise4 = await getRole();
  const promise5 = await getPartnerType();
  Promise.all([promise1, promise2, promise3, promise4, promise5])
  loading.value = false;

});
const getCompanies = async () => {
  try {
   // loading.value.roles = true;
    const response = await compnayService.getCompanyAll();
    if (response.data?.is_success) {
      selected_items.value.companies = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
   // loading.value.roles = false;
  }
}
const getRole = async () => {
  try {
   // loading.value.roles = true;
    const response = await roleUnitService.getRoleAll();
    if (response.data?.is_success) {
      selected_items.value.role = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
   // loading.value.roles = false;
  }
}
const getBusinessUnit = async () => {
  try {
    //loading.value.businesUnit = true;
    const response = await businessUnitService.getBusinesUnitAll();
    if (response.data?.is_success) {
      selected_items.value.bu_owners = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    //loading.value.businesUnit = false;
  }
}
const getCompaniesCategories = async () => {
  try {
   //loading.value.comp_categories = true;
    const response = await compnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      selected_items.value.comp_categories = response.data.data
      // console.log("cata", selected_items.value.comp_categories)
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknoddddwn", e.message);
  } finally {
    //loading.value.comp_categories = false;
  }
}

const getPartnerType = async () => {
  try {
   // loading.value.roles = true;
    const response = await partnerTypeService.getPartnerTypeAll();
    if (response.data?.is_success) {
      selected_items.value.partner_type = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
   // loading.value.roles = false;
  }
}
const clearAll = () =>{
  CompaniesId.value = null;
  RoleId.value = null;
  BuOwnersId.value = null;
  AffiliateId.value = null;
  PartnerTypeId.value = null;
  CompCategoriesId.value = null;
  DateFrom.value = null;
  DateTo.value = null;
}
</script>

