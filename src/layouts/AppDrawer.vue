<template>
  <!-- permanent -->
  <v-navigation-drawer rail v-model="isOpen" expand-on-hover>
    <v-list dense color="secondary">
      <nav-item v-for="(item, index) in menus" :key="index" :go-to="item.path" :is-active="isActive(item.path)"
        :icon="item.icon" :id="item.id" :title="item.title"></nav-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref , computed , onMounted } from "vue";
import { useRoute } from "vue-router";
import NavItem from "../components/items/NavItem.vue";
import Navigation from "../router/navigation";
import { useSessionInfoStore } from "@/stores/sessionInfoStore";
const store = useSessionInfoStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const isOpen = ref(true);
const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
const menus = computed(() => {
  const modules = store.sessionInfo?.modules;
  if(modules){
    return  Array.from(modules, (x) => {
      return Navigation.find(_ => _.module_id === x.module_id);
    })
  }
  return [];
});

onMounted(() => {
  const modules = store.sessionInfo?.modules;
  if(modules === null || modules === undefined || modules === '') {
    router.push('/Authorization');
   }
});

</script>
