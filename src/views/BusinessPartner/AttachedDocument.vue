<template>
  <v-container>
    <h2>Attached Document</h2>
    <div class="mt-5">

      <v-row justify="end" class="mt-2 mb-2" dense>
        <v-col cols="1">
          <v-btn  to="/BusinessPartner/CreateBusinessPartner" block class="text-capitalize rounded-pill" color="red">
            <v-icon left>mdi-plus</v-icon>
            ขอเอกสารเพิ่มเติม
          </v-btn>
        </v-col>
      </v-row>
      <AttachedDocumentTable class="mt-5" />
      <!-- <PaginationControl class="mt-9" /> -->
    </div>

    <v-card class="mt-9 pt-9" >
          <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title>
         <strong>แนบเอกสารเพิ่มเติม</strong>
        </v-toolbar-title>
        <template v-slot:append>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </template>
      </v-toolbar>
    <div class="pa-9">
        <Choosefile @input-file="handleOnChangeFile" :is-file="file" title="" list-title="uploaded Files">
        </Choosefile>
        </div>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn class="rounded-pill" color="secondary" variant="flat" width="120" @click="handleUpload()">
          อัพโหลด
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
     </v-col>
    </v-row>
  </v-card>

      <div>
        <v-tabs v-model="tab" color="secondary">
          <v-tab v-for="(tabs, index) in items" :key="index" class="text-capitalize">
           <h3>{{ tabs.title }}</h3>
          </v-tab>
        </v-tabs>
        <v-tabs-items>
          <v-tab-item>
            <v-card elevation="2" rounded="0" class="rounded-lg mt-3" v-for="i in 3" :key="i">
              <v-card-item class="ma-0">
                <v-row no-gutters dense justify="space-around">

             <v-col cols="1" align-self="center" class="d-flex justify-end">
              <v-checkbox hide-details hide-spin-buttons class="pa-0 ma-0 "></v-checkbox>
            </v-col>
            <v-col cols="1" align-self="center" class="d-flex justify-start">
            <v-chip color="secondary" label>
                PDF
              </v-chip>
            </v-col>

            <v-col cols="3" align-self="center" class="pa-1">
              <strong>นโยบายการจัดซื้อจัดจ้างอย่างรับผิดชอบ</strong>
              <strong class="text-grey">(V.4)</strong>
            </v-col>

             <v-col cols="1" align-self="center" class="pa-1">
                <span>36.4 MB</span>
              </v-col>

                  <v-divider vertical class="ma-2"></v-divider>
                  <v-col cols="2" align-self="center" class="pa-1">


                    <strong class="text-secondary">sss@gmail.com</strong>
                     <br />
                     <strong>upload 12/12/1212</strong>
                  </v-col>

                  <v-col cols="2" align-self="center" class="pa-1">
                    <v-btn class="me-2 text-none" color="secondary" variant="outlined" rounded>
                     <v-icon icon="mdi-delete"></v-icon>
                      Download
                    </v-btn>

                  </v-col>
                  <v-col cols="1" align-self="center" class="pa-1">
                    <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-btn text v-bind="props" variant="text">
                    <v-icon icon=" mdi-dots-horizontal"></v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item @click="handleDelete(i)">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-delete"></v-icon>
                    </template>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>

  </v-container>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount,computed } from 'vue';
import AttachedDocumentTable from "@/components/tables/businesspartner/AttacheducTable.vue";
import PaginationControl from '@/components/controls/PaginationControl'
import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
import Choosefile from '@/components/forms/Choosefile'
import  UploadPolicy from '@/components/forms/UploadPolicy'
const { showDialog } = useConfirmationDialog();
const emit = defineEmits(["visible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const fav = ref(true)
const menu = ref(false)
const message = ref(false)
const hints = ref(true)
const tab = ref(null);
// const dialog = ref({
//   uploadPolicy:false
// });
const items = ref([]);
const file = ref(null);
const dialog = computed({
  get() { return props.visible },
  set(value) { emit("visible", value) },
});
const handleOnChangeFile = async (val) => {
  file.value = val;
}
const handleUpload = () => {
  console.log("upload")
}


onBeforeMount(() => {
  items.value = [
    { title: 'All Document', icon: 'mdi-account-outline' },
    { title: 'Recently Delete', icon: 'mdi-link-variant' },
  ]
});
onBeforeMount(() => {


});

// const handleUploadPolicyOpened =()=>{

// }

const handleDelete = async () => {
  //e.preventDefault()
  const confirmed = await showDialog('ยืนยันลบแบบฟอร์ม','กรุณาตรวจสอบคลิกปุ่ม "ตกลง" เพื่อดำเนินการ');
      if (confirmed) {
        console.log('Action confirmed!');
      } else {
        console.log('Action cancelled.');
      }

};

</script>

