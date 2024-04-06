<template>
  <v-container fluid>
    <v-row justify="end" class="mt-5 pt-5" dense>
      <v-col cols="1">
        <v-btn variant="outlined" block class="text-capitalize" color="black">
          <v-icon left>mdi-email</v-icon>
          Preview ({{ amountItemSelect }})
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn block class="text-capitalize" color="black">
          <v-icon left>mdi-microsoft-excel</v-icon>
          Export ({{ amountItemSelect }})
        </v-btn>
      </v-col>
      <v-col cols="12">
        <ExportTaskTable
          :items="content.items"
          :menu-items="menu_items"
          @handle-menu-clicked="onHandleMenuClicked"
          @handle-selection="onHandleSelection"
        />
        <!-- @handle-item-click="onHandleItemClick" -->
      </v-col>
      <v-col cols="12">
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
import ExportTaskTable from "@/components/tables/accounts/ExportTaskTable.vue";
import PaginationControl from "@/components/controls/PaginationControl.vue";
import paginationUtils from "@/utils/paginationUtils";
import AccountService from "@/apis/AccountServive";
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
// const dialogFilter = ref(false);
const amountItemSelect = ref(0);
const menu_items = [
  {
    id: 0,
    title: "แก้ไข",
    icon: "mdi mdi-wrench-cog",
  },
  {
    id: 1,
    title: "Move to Ready Export",
    icon: "mdi mdi-arrow-left",
  },
  {
    id: 2,
    title: "Reject",
    icon: "mdi mdi-close-circle",
  },
];

// const getHint = (hint) => {
//   const findHint = items.value.topics.find((el) => el.id === hint)
//   return "ค้นหาด้วย " + findHint?.name
// }

const onHandleMenuClicked = (value) => {
  const { event_id, item_id } = value;
  switch (event_id) {
    case menu_items[0].id:
      console.log("แก้ไข: ", item_id);
      break;
    case menu_items[1].id:
      console.log("Move to Ready Export: ", item_id);
      break;
    case menu_items[2].id:
      console.log("Reject: ", item_id);
      break;
  }
};

// const onHandleClickSearch= () => {
//   console.log(JSON.stringify(filter.value))
// }

const handlePaginationEvent = (page) => {
  filter.value.page = page;
  filter.value.offset = paginationUtils.pageOffset(page, filter.value.limit);
};

onMounted(() => {
  getAccountArchiveAll();
});

const getAccountArchiveAll = async () => {
  try {
    const response = await AccountService.getAccountArchivetAll();

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
//   }
// };

const onHandleSelection = (value) => {
  amountItemSelect.value = value.length;
  console.log("onHandleSelection: ", JSON.stringify(value));
};
</script>

<style>
.full-page {
  width: 100%;
}
</style>
