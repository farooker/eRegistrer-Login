<template>
  <v-container fluid>
    <div class="pa-7 ma-9">
      <v-card rounded class="mx-auto pa-4">
        <v-card-title class="d-flex align-center justify-center">
          <v-row dense no-gutters class="mb-4">
            <v-col cols="12" class="text-center mb-5">
              <h3>แบบรายงานและเปิดเผยความขัดแย้งและผลประโยชน์</h3>
            </v-col>
            <v-row justify="center" align="center">
              <v-col cols="12" class="text-center mb-4">
                <h4>สำหรับบุคคลหรือนิติบุคคลที่เข้ามาก่อนิติสัมพันธ์</h4>
              </v-col>
            </v-row>

            <v-col cols="12">
              <v-row justify="center" align="center">
                <h4>Conflict of Interest Disclosure Form for vendor</h4>
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row dense no-gutters class="ma-5 pa-">
          <v-col cols="6">
            <v-text-field
              class="ml-2"
              density="compact"
              dense
              v-model="input_data.company_name"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="2" class="ml-4 pl-4">
            <v-card-title>
              <h6>เลขประจำผู้เสียภาษีอากร</h6>
            </v-card-title>
            <!-- <h4 class="ml-">เลขประจำผู้เสียภาษีอากร</h4> -->
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="input_data.taxpayer_id_number"
              class="mr-"
              density="compact"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <!-- <h4 class="ml-">บรรทัดสอง</h4> -->
          <v-col cols="1" class="">
            <v-card-title>
              <h6>ข้าพเจ้าชื่อ</h6>
            </v-card-title>
            <!-- <h4 class="ml-">เลขประจำผู้เสียภาษีอากร</h4> -->
          </v-col>
          <v-col cols="2">
            <v-radio-group v-model="input_data.select_title" inline>
              <v-radio label="นาย" value="นาย"></v-radio>
              <v-radio label="นาง" value="นาง"></v-radio>
              <v-radio label="นางสาว" value="นางสาว"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="3">
            <v-text-field
              class="ml-"
              density="compact"
              dense
              variant="outlined"
              v-model="input_data.firstname"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="">
            <v-card-title>
              <h6>นามสกุล</h6>
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-text-field
              class=""
              density="compact"
              dense
              variant="outlined"
              v-model="input_data.lastname"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="">
            <v-card-title>
              <h6>ขอรายงานว่าข้าพเจ้า</h6>
            </v-card-title>
          </v-col>
          <v-col cols="12">
            <v-row dense>
              <v-col cols="12 " class="">
                <v-radio-group v-model="input_data.radio" color="red" class="">
                  <v-radio value="1">
                    <template v-slot:label>
                      <div>
                        <strong class="text-black">มี</strong>
                        {{ is_related }}
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label>
                      <div>
                        <strong class="text-black">ไม่มี</strong>
                        {{ is_related }}
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div v-if="input_data.radio == 1">
          <v-row
            dense
            no-gutters
            class="ma-5"
            v-for="(item, index) in input_data.items_contects"
            :key="index"
          >
            <!-- <h4 class="ml-">บรรทัดสอง</h4> -->
            <v-col cols="1" class="ma-">
              <v-card-title>
                <h6>ชื่อ</h6>
              </v-card-title>
              <!-- <h4 class="ml-">เลขประจำผู้เสียภาษีอากร</h4> -->
            </v-col>
            <v-col cols="2">
              <v-radio-group v-model="item.select_title" inline color="red">
                <v-radio label="นาย" value="นาย"></v-radio>
                <v-radio label="นาง" value="นาง"></v-radio>
                <v-radio label="นางสาว" value="นางสาว"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="4">
              <v-text-field
                class="ml-"
                density="compact"
                dense
                variant="outlined"
                v-model="item.firstname"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="">
              <v-card-title>
                <h6>นามสกุล</h6>
              </v-card-title>
            </v-col>
            <v-col cols="4">
              <v-text-field
                class=""
                density="compact"
                dense
                variant="outlined"
                v-model="item.lastname"
              ></v-text-field>
            </v-col>

            <v-col cols="1" class="">
              <v-card-title>
                <h6>ตำแหน่ง</h6>
              </v-card-title>
            </v-col>
            <v-col cols="3">
              <v-text-field
                class=""
                density="compact"
                dense
                variant="outlined"
                v-model="item.position"
              ></v-text-field>
            </v-col>

            <v-col cols="1" class="">
              <v-card-title>
                <h6>หน่วยงาน</h6>
              </v-card-title>
            </v-col>
            <v-col cols="3">
              <v-text-field
                class=""
                density="compact"
                dense
                variant="outlined"
                v-model="item.agency"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="">
              <v-card-title>
                <h6>เกี่ยวข้องเป็น</h6>
              </v-card-title>
            </v-col>
            <v-col cols="3">
              <v-text-field
                class=""
                density="compact"
                dense
                variant="outlined"
                v-model="item.relevant"
              ></v-text-field>
            </v-col>
          </v-row>

          <ButtonControl
            icon="mdi mdi-plus"
            text="เพิ่ม"
            @button-clicked="handleAddNewContact"
          />
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center mb-0">
              <h4>ข้าพเจ้าฯ ขอรายงานรายละเอียดของรายการที่เป็นหรืออาจเป็นความขัดแย้งทางผลประโยชน์กับบริษัทฯ เพิ่มเติม ดังนี้</h4>
            </v-col>
            <v-col cols="12" class="ma-5">
            <v-textarea class=""  label="" variant="outlined"></v-textarea>
            </v-col>
          </v-row>
          <strong>เอกสารเพิ่มเติม</strong>
        <v-card class="mt-9 pt-" >
          <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title>

        </v-toolbar-title>
        <template v-slot:append>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </template>
      </v-toolbar>
    <div class="pa-9">
        <ChooseMultiFiles
          :max-file="10"
          icon="mdi mdi-file-document"
          @input-files="handleInputFiles"
        />
        </div>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-card-actions class="pa-5">
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
      </v-card-actions>
     </v-col>
    </v-row>
  </v-card>
        </div>
        <v-row dense no-gutters class="ma-5 pl-6">
          <v-col cols="12">
            <v-card-text>
              <p>
                <strong
                  >ข้าพเจ้าขอยืนยันและรับรองว่า
                  ข้าพเจ้าได้ใช้ความรู้และความเชื่อที่ดีที่สุดของข้าพเจ้า
                  ในการเปิดเผยความสัมพันธ์และความขัดแย้ง ที่เกิดขึ้นจริง
                  ที่รับรู้ หรือ</strong
                >
                <strong>
                  ที่อาจเกิดขึ้นของข้าพเจ้าอย่างเต็มที่และครบถ้วนในแบบฟอร์มนี้ตามข้อกำหนดของบริษัท</strong
                >
              </p>
            </v-card-text>
          </v-col>

          <v-col cols="12" class="mb-9 ">
            <v-card-text>
              <p>
                <strong class="pl-4 ml-4"
                  >หากข้าพเจ้ามีเจตนาปกปิด บิดเบือน หรือให้ข้อมูลเท็จ
                  ข้าพเจ้ายินดีให้บริษัทดำเนินการตามที่เห็นว่าเหมาะสม
                  รวมถึงพนักงานที่ข้าพเจ้าปกปิด</strong
                >
                <!-- <br /> -->
                <strong>
                  ความสัมพันธ์ที่เกี่ยวข้อง
                  อาจถูกดำเนินการตามบทลงโทษที่ได้บัญญัติไว้ในนโยบายต่อต้านการทุจริตคอร์รัปชั่น
                  (Anti-Corruption Policy) ด้วย</strong
                >
              </p>
            </v-card-text>
          </v-col>

          <v-row justify-end v-if="current_view === 2">
          <v-col cols="12" class="text-right">
              {{ name }}
          </v-col>
          </v-row>
        </v-row>
        <v-row justify="center" class="mb-5 mt-" v-if="current_view === 1" >
          <v-col cols="auto">
            <ButtonControl
              color="black"
              text="ลงชื่อ"
              width="100"
              @button-clicked="handleNext"
            />
          </v-col>
        </v-row>
      </v-card>
      <v-footer color="transparent" style="margin-top: 50px">
        <v-row justify="center">
          <v-col cols="auto">
            <button-control
              color="black"
              text="ย้อนกลับ"
              width="100"
              @button-clicked="handleBack"
            />
          </v-col>
          <v-col cols="auto">
            <button-control
              type="submit"
              @button-clicked="handleSubmit"
              color="secondary"
              text="ตกลง"
              width="100"
            />
          </v-col>
        </v-row>
      </v-footer>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import ChooseMultiFiles from "../../components/forms/ChooseMultiFiles.vue";
const input_data = ref({
  radio: null,
  select_title: null,
  company_name: "",
  taxpayer_id_number: "",
  firstname: "",
  items_contects: [],
  items_name: [],
  lastname: "",
});

const name = ref(
  `dddd@gmail.com 19/10/23 12.00`
);

let current_view = ref(1);

var currentDate = new Date();
console.log("date",currentDate)
// var uptime = currentDate.getTime();
// console.log("Uptime: ", uptime); // แสดงค่าเวลาปัจจุบันที่เก็บไว้ในตัวแปร uptime

const is_related = ref(
  ` ความสัมพันธ์กับพนักงานบริษัทฯ หรือความขัดแย้งทางผลประโยชน์ซึ่งเกี่ยวข้องหรืออาจเกี่ยวข้องกับบริษัทฯ`
);

// const handleNext = (data) => {
//   console.log("handleNext", data);
// };
const handleBack = (data) => {
  console.log("handleBack", data);
};
const handleSubmit = (data) => {
  console.log("handleSubmit", data);
};
const handleAddNewContact = () => {
  input_data.value.items_contects.push({
    firstname: "",
    select_title: "",
    lastname: "",
    position: "",
    agency: "",
    relevant: "",
  });
};

const handleNext = () => {
  current_view.value= 2
};

// const handleNexttime = () => {
//   var currentDate = new Date();
//   var uptime = currentDate.getTime();
//   console.log("Uptime: ", uptime); // แสดงค่าเวลาปัจจุบันที่เก็บไว้ในตัวแปร uptime
// };
</script>
