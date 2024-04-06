<template>
  <v-container>
    <h2>Business Partner List</h2>
    <div class="mt-5">
      <v-row dense class="mt-5 mb-5">
        <v-col cols="10">
          <v-row no-gutters dense>
            <v-col cols="3">
              <v-select
                v-model="filter.search_key"
                density="compact"
                class="rounded-s-lg"
                variant="solo"
                :items="selected_items.topics"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="9">
              <v-row no-gutters>
                <v-divider vertical></v-divider>
                <v-text-field
                  v-model="filter.search_value"
                  density="compact"
                  variant="solo"
                  class="rounded-e-lg"
                  placeholder="ค้นหา  Business Partner Name"
                  single-line
                  hide-details
                ></v-text-field>
                <v-btn
                  color="grey-lighten-2"
                  height="40"
                  rounded="0"
                  class="rounded-e"
                  @click="getSearchBusinessPartner"
                >
                  <v-icon size="25">mdi-magnify</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2">
          <FilterBusinessPratner
            :companies_id="filter.companies_id"
            :role_id="filter.role_id"
            :bu_owners_id="filter.bu_owners_id"
            :affiliate_id="filter.affiliate_id"
            :partner_type_id="filter.partner_type_id"
            :comp_categories_id="filter.comp_categories_id"
            :date_from="filter.date_from"
            :date_to="filter.date_to"
            @companies_id="filter.companies_id = $event"
            @role_id="filter.role_id = $event"
            @bu_owners_id="filter.bu_owners_id = $event"
            @affiliate_id="filter.affiliate_id = $event"
            @partner_type_id="filter.partner_type_id = $event"
            @comp_categories_id="filter.comp_categories_id = $event"
            @date_from="filter.date_from = $event"
            @date_to="filter.date_to = $event"
          />
        </v-col>
      </v-row>

      <v-row justify="end" class="mt-2 mb-2" dense>
        <v-col cols="1">
          <v-btn
            to="/BusinessPartner/SearchBusinessPartner"
            block
            class="text-capitalize rounded-pill"
            color="red"
          >
            <v-icon left>mdi-plus</v-icon>
            Create form
          </v-btn>
        </v-col>
      </v-row>
      <!-- {{ content.items }} -->
      <BusinessPartnerTable
        class="mt-5"
        :items="content.items"
        :loading="loading.items"
        :selected="selected_checked[`${filter.page - 1}`]"
        @selected="selected_checked[`${filter.page - 1}`] = $event"
      />
      <PaginationControl
        class="mt-3"
        :value="filter.page"
        :length="filter.pageSize"
        @value="handlePaginationEvent"
      />
    </div>
  </v-container>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount, onMounted, computed } from "vue";
import BusinessPartnerTable from "@/components/tables/businesspartner/BusinessPartnerTable.vue";
import FilterBusinessPratner from "@/components/dialogs/FilterBusinessPratner.vue";
import PaginationControl from "@/components/controls/PaginationControl";

import paginationUtils from "@/utils/paginationUtils";
import { useRouter } from "vue-router";
import RspService from "@/apis/RspService";
import PartnerService from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

const selected_checked = ref([]);
const selected_items = ref({
  topics: [
    {
      id: "business_partner_name",
      name: "Business Partner Name",
    },
    {
      id: "vendor Number",
      name: "vendor Number",
    },
    {
      id: "tax_ID",
      name: "Tax ID",
    },
    {
      id: "contact_owner",
      name: "Contact Owner",
    },
    {
      id: "Team_owner",
      name: "Team Owner",
    },
    {
      id: "credit_score",
      name: "Credit Score",
    },
  ],

  companies: [],
  bu_owners: [],
  partner_type: [],
  affiliate: [],
  status: [
    {
      id: 0,
      name: "Inactive",
    },
    {
      id: 1,
      name: "Active",
    },
  ],
  companies_cate: [],
});

const filter = ref({
  search_key: "business_partner_name",
  search_value: null,
  companies_id: null,
  role_id: null,
  bu_owners_id: null,
  affiliate_id: null,
  partner_type_id: null,
  comp_categories_id: null,
  date_from: null,
  date_to: null,
  offset: 0,
  limit: 1000,
  page: 1,
  pageSize: 1,
});

const loading = ref({
  registered: false,
  report: false,
  items: false,
});
const content = ref({
  items: [],
});

onMounted(() => {
  getSearchBusinessPartner();
});

const getSearchBusinessPartner = async () => {
  try {
    loading.value.items = true;
    content.value.items = [];
    const response = await PartnerService.getSearchBusinessPartner(
      filter.value.offset,
      filter.value.limit,
      filter.value.search_key,
      filter.value.search_value,
      filter.value.companies_id,
      filter.value.role_id,
      filter.value.bu_owners_id,
      filter.value.comp_categories_id,
      filter.value.affiliate_id,
      filter.value.partner_type_id,
      filter.value.date_from,
      filter.value.date_to
    );
    const headers = response.headers;

    const itemsOffset = Number(headers["Items-Offset"]);
    const itemsLimit = Number(headers["Items-Limit"]);
    const itemsTotal = Number(headers["Items-Total"]);

    console.log(headers["Items-Offset"]);
    console.log(itemsOffset, itemsLimit, itemsTotal);

    filter.value.offset = itemsOffset;
    filter.value.limit = itemsLimit;

    filter.value.pageSize = paginationUtils.pageSize(itemsLimit, itemsTotal);
    if (response.data?.is_success) {
      content.value.items = [];

      content.value.items = response.data.data?.business_partners;

      // response.data?.data.forEach((dataItem) => {
      // response.data.data?.business_partners ??
      //   [].forEach((partner) => {
      //     content.value.items.push(partner);
      //   });
      // });
      // content.value.items = response.data?.data.map((item) => {
      //   return {
      //     ...item.business_partners
      //   }
      // });
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.items = false;
  }
};

const handlePaginationEvent = (page) => {
  filter.value.page = page;
  filter.value.offset = paginationUtils.pageOffset(page, filter.value.limit);
  getSearchBusinessPartner();
};

</script>
