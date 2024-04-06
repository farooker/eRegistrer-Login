<template>
  <!-- <v-card color="secondary" width="100%">
    <v-card-title>
      <h6>Attached Document</h6>
    </v-card-title>
    <v-row dense align="center">
      <v-col cols="2" v-for="(item_file, i) in item_files" :key="i">
        <v-card class="ma-3">
          <v-row dense>
            <v-col cols="1">
              <v-icon size="45" class="mt-2" color="red"
                >mdi mdi-file-document
              </v-icon>
            </v-col>
            <v-col cols="9" class="mt-2">
              <span
                class="ml-6 text-subtitle-2 truncate"
                style="font-weight: bold"
                >{{ item_file.file_name }}</span
              >
              <p class="ml-6 text-subtitle-2" style="color: grey">
                {{ item_file.file_size }}
              </p>
            </v-col>
            <v-col cols="2" style="background-color: rgb(229, 229, 229)">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi mdi-menu-down"
                    variant="plain"
                    size="large"
                    v-bind="props"
                  />
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in item_menu"
                    :key="index"
                    :value="index"
                    @click="hanldeMenuClick(item, item_file)"
                  >
                    <v-list-item-title
                      ><span :class="item.icon"></span>
                      {{ item.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="1" align-self="center" justify-end>
        <v-btn
          @click="handleDownloadAll"
          prepend-icon="mdi mdi-download"
          variant="text"
        >
          dawnload all
        </v-btn>
      </v-col>
    </v-row>
  </v-card> -->
  <v-card color="secondary" width="100%">
    <v-card-title>
      <h6>Attached Document</h6>
    </v-card-title>
    <v-row dense align="center">
      <v-col cols="12">
        <v-row justify="start">
          <v-col cols="auto" v-for="(item_file, i) in item_files" :key="i" class="file-item">
            <v-card class="ma-2">
              <v-row dense>
                <v-col cols="12" sm="3">
                  <v-icon size="45" class="mt-2" color="red"
                    >mdi-file-document</v-icon
                  >
                </v-col>
                <v-col cols="12" sm="6">
                  <span
                    class="text-subtitle-2 truncate"
                    style="font-weight: bold"
                    >{{ item_file.file_name }}</span
                  >
                  <p class="text-subtitle-2" style="color: grey">
                    {{ item_file.file_size }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  style="background-color: rgb(229, 229, 229)"
                >
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="plain" size="large" v-bind="props">
                        <v-icon>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in item_menu"
                        :key="index"
                        @click="hanldeMenuClick(item, item_file)"
                      >
                        <v-list-item-title
                          ><v-icon :class="item.icon"></v-icon
                          >{{ item.title }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="auto" class="ml-8  mt-5 d-flex justify-center">
            <v-btn @click="handleDownloadAll" icon>
              <v-icon>mdi-download</v-icon> Download All
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";

const emit = defineEmits(["on-attach-file"]);

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        file: null,
        file_name: "Vendor Qualification System API Specification 1",
        file_size: "12 MB",
      },
      {
        file: null,
        file_name: "System API Specification 1",
        file_size: "15.2 MB",
      },
      {
        file: null,
        file_name: "Qualification System API Specification 1",
        file_size: "50 MB",
      },
    ],
  },
});

const item_files = ref(props.items);

watchEffect(() => {
  item_files.value = props.items;
});

const item_menu = ref([
  { title: "Preview", icon: "mdi mdi-eye-outline" },
  { title: "Dawnload", icon: "mdi mdi-download" },
]);

const handleDownloadAll = () => {
  window.alert("Handle Dawnload Attach All!");
};

const hanldeMenuClick = (item, item_file) => {
  if (item.title === item_menu.value[0].title) {
    window.alert(`Handle Preview Attach ${JSON.stringify(item_file)}`);
  }

  if (item.title === item_menu.value[1].title) {
    window.alert(`Handle Dawnload Attach ${JSON.stringify(item_file)}`);
  }
};

watch(item_files.value, (newValue) => {
  emit("on-attach-file", newValue);
});
</script>

<style scoped>
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.file-item {
  min-width: 240px;
  max-width: 240px;
  margin-top: 10px
}
</style>
