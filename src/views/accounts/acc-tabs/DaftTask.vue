<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" class="mt-5 pt-5">
        <AccountTaskTable
          :items="content.items"
          color-card-alert="warming"
          @handle-reject-clicked="onHandleRejectClicked"
        />
      </v-col>
      <!-- @handle-item-click="onHandleItemClick" -->
      <v-col cols="12" v-if="content.items.length >= 10">
        <PaginationControl
          class="mt-3"
          :value="filter.offset"
          @value="handlePaginationEvent"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AccountTaskTable from "@/components/tables/accounts/AccountTaskTable.vue";
import PaginationControl from "@/components/controls/PaginationControl.vue";
import AccountService from "@/apis/AccountServive";
import paginationUtils from "@/utils/paginationUtils";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
// import { useRouter } from "vue-router";

const { handlingErrorsMessage } = useErrorHandlingDialog();
// const router = useRouter();

const content = ref({
  items: [],
});

const filter = ref({
  offset: 1,
  limit: 10,
});

onMounted(() => {
  getAccountDraftAll();
});

const getAccountDraftAll = async () => {
  try {
    const response = await AccountService.getAccountDraftAll();

    // const headers = response.headers;
    // const itemsOffset = Number(headers["items-offset"]);
    // const itemsLimit = Number(headers["items-limit"]);
    // const itemsTotal = Number(headers["items-total"]);

    // filter.value.offset = itemsOffset;
    // filter.value.limit = itemsLimit;
    // filter.value.pageSize = paginationUtils.pageSize(itemsLimit, itemsTotal);
    if (response.data?.is_success) {
      content.value.items = response.data?.data;
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
const onHandleRejectClicked = (id) => {
  console.log("onHandleRejectClicked: ", id);
};

// const onHandleItemClick = (item) => {
//   switch (item.account_task_action) {
//     case "New Register":
//       router.push({ name: "AccountDetail", params: { id: item.id } });
//       break;
//     case "Extend Role":
//       router.push({
//         name: "AccountExtendRole",
//         query: { id: item.id, form_number: item.form_number },
//       });
//       break;
//     case "Extend Company":
//       router.push({
//         name: "AccountExtendCompany",
//         query: { id: item.id, form_number: item.form_number },
//       });
//       break;
//     case "Change Info.":
//       router.push({
//         name: "AccountChangeInfo",
//         query: { form_number: item.form_number },
//       });
//       break;
//   }
// };

const handlePaginationEvent = (page) => {
  filter.value.page = page;
  filter.value.offset = paginationUtils.pageOffset(page, filter.value.limit);
};
</script>
