<template>
  <div>
    <v-card class="mx-auto elevation-1" color="secondary" height="50">
      <v-card-item dense>
        <v-row no-gutters dense justify="space-around">
          <!-- <v-col cols="1">
            <v-checkbox hide-details class="pa-0 mt-n3"></v-checkbox>
          </v-col> -->
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>Create Date</strong>
          </v-col>
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>xxx ID</strong>
          </v-col>
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>Role</strong>
          </v-col>
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>Name</strong>
          </v-col>
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>Bus Owner</strong>
          </v-col>
          <v-col cols="2" align-self="center" class="mt-1">
            <strong>Contact Owner</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>

    <v-expansion-panels v-model="panel" class="mt-1">
      <v-progress-linear class="rounded-pill" :indeterminate="loading" bg-color="transparent"
        color="secondary"></v-progress-linear>
      <v-expansion-panel v-for="(i, index) in 1" :key="index" class="mt-1"
        :style="index === panel ? 'border: 2px solid red;' : ''">
        <v-expansion-panel-title :color="index === panel ? '#FFF1F0' : ''">
          <template v-slot:actions="{ expanded }">
            <v-icon color="secondary" :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
          </template>
          <v-row no-gutters dense justify="space-around">
            <!-- <v-col cols="1">
              <v-checkbox hide-details hide-spin-buttons class="pa-0 ma-0"></v-checkbox>
            </v-col> -->
            <v-col cols="2" align-self="center">
              <strong>04/08/66</strong>
            </v-col>
            <v-col cols="2" align-self="center">
              <strong>123455667</strong>
            </v-col>
            <v-col cols="2" align-self="center">
              <strong>Vendor</strong>
            </v-col>
            <v-col cols="2" align-self="center">
              <strong>บริษัทนันทวัน จำกัด</strong>
            </v-col>
                        <v-col cols="2" align-self="center">
              <strong>commercial</strong>
            </v-col>
            <v-col cols="2" align-self="center">
               <strong>xxxx@gmail.com</strong>
              <br />
              <strong>Retail Marketing</strong>
              /<span class="text-grey">While convenient, the color pack</span>/
              <span class="text-grey">Commentail</span>
            </v-col>
          </v-row>




        </v-expansion-panel-title>
        <v-expansion-panel-text style="background-color: #fff1f0">
          <v-card class="ml-n3 mr-n3" elevation="0" rounded="0">
            <v-card-item class="ma-2">
              <v-row justify="space-around" dense="">
                <v-col cols="12">
                  <v-row dense>
                    <v-col cols="12">
                      <div class="text-h6 text-secondary font-weight-black">Company Info.</div>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Business Partner Number</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">FPT Affillate</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Organization Type</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Juristic Type</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>


                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Company Category</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Product/ Service Category</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>


                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Vendor Number</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>

                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Company Code of Vendor</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Customer Number</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>

                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Company Code of Customer</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Create By</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Admin Vendor Email</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-5 mb-5"></v-divider>

                  <v-row dense>
                    <v-col cols="12">
                      <div class="text-h6 text-secondary font-weight-black">Payment Info.</div>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">VAT Registered</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Account Name</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Bank</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Account Number</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-5 mb-5"></v-divider>




                  <v-row dense class="mt-5">
                    <v-col cols="12">
                      <div class="text-h6 text-secondary font-weight-black">Branch Info.</div>
                    </v-col>
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="4">
                          <v-select density="compact" variant="outlined" placeholder="Roles" item-title="name"
                            item-value="id">
                            <template v-slot:append-inner>
                              <v-badge color="#FF7E40" content="6" inline text-color="#FFFFFF"></v-badge>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>

                    </v-col>
                    <v-col cols="3">
                      <label class="font-weight-medium  text-grey-lighten-1">Business Partner Role</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="9">
                      <label class="font-weight-medium  text-grey-lighten-1">Branch Code </label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>


                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Branch Address</label>
                      <br />
                      <span class="font-weight-black">value</span>
                    </v-col>
                    <v-col cols="12">
                      <label class="font-weight-medium  text-grey-lighten-1">Contact Person</label>
                      <br />
                      <v-row v-for="(item, index) in 3" :key="index" dense>
                        <v-col cols="4">
                          <span class="font-weight-black"> name surname-{{ index }}</span>
                        </v-col>
                        <v-col cols="4">
                          <span class="font-weight-black"> 08465466</span>
                        </v-col>
                        <v-col cols="4">
                          <span class="font-weight-black"> test@gamil.com</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>


                </v-col>
                <v-divider vertical></v-divider>

              </v-row>
            </v-card-item>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
// import Active from '@/components/status/Active'
// import Role from '@/components/status/Role'
// import dateUtils from "@/utils/dateUtils";

const emit = defineEmits(["action-edit"]);
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 400
  }
});
const panel = ref([]);

// const files = ref([
//   {
//     subtitle: 'update 27/12/2553 10:00 น.',
//     title: 'Action',
//     value: 'B'
//   },
//   {
//     subtitle: 'update 27/12/2553 10:00 น.',
//     title: 'Recipes',
//     value: '60'
//   },
//   {
//     subtitle: 'update 27/12/2553 10:00 น.',
//     title: 'Work',
//     value: '70'
//   },
// ]);

// eslint-disable-next-line no-unused-vars
const handleEditEvent = (item) => {
  emit("action-edit", item)
}
</script>

