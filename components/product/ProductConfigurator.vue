<script setup lang="ts">
import { ConfiguratorDescription } from "#components";
import { useConfigState } from "~/composables/configurator/configState";
import { PROVIDED_KEY } from "~/constants";
import type { AllData } from "~/types/allData";

const allData: AllData = await useConfigState();
const emit = defineEmits<{
  (e: "dataReady"): void;
}>();
onMounted(() => {
  emit("dataReady");
});

provide(PROVIDED_KEY, allData);
</script>

<template>
  <div
    class="sm:flex h-screen sm:max-h-[672px] relative overflow-y-auto overflow-x-hidden"
  >
    <div class="p-6 pb-0 flex flex-col gap-3">
      <h1 class="text-2xl font-bold">
        {{ allData.selectedGroupIndex.value + 1 }}.
        <span class="text-base font-normal sm:hidden"
          >/{{ allData.groupsData.value.length }}</span
        >

        {{ allData.selectedGroupLabel }}
        <span v-if="allData.type.value !== 3"> wählen </span>
      </h1>
      <ConfiguratorSearch v-if="allData.type.value !== 3" />

      <ConfiguratorProfileMenu
        v-if="!allData.componentToShow.value && allData.type.value === 1"
      />
      <ConfiguratorOptionsMenu v-else />
      <ConfiguratorDimensionsMenu v-show="allData.type.value === 2" />
      <ConfiguratorDescription v-show="allData.type.value === 3" />
    </div>

    <ConfiguratorSidebar />
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
