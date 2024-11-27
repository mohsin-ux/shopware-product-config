<script setup lang="ts">
import { ConfiguratorDescription, ConfiguratorShowImage } from "#components";
import { useConfigState } from "~/composables/configurator/configState";
import { PROVIDED_KEY } from "~/constants";
import type { AllData } from "~/types/allData";

const allData: AllData = await useConfigState();
const isMenuVisible = ref<boolean>(false);
const emit = defineEmits<{
  (e: "dataReady"): void;
}>();
onMounted(() => {
  emit("dataReady");
});

provide(PROVIDED_KEY, allData);
function toggleMenuVisible() {
  isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
  <div
    class="sm:flex h-screen sm:max-h-[671px] max-sm:w-screen relative overflow-y-hidden overflow-x-hidden"
  >
    <ConfiguratorShowImage v-if="allData.isImageVisible.value" />

    <div v-else class="p-6 pb-0 flex flex-col gap-3">
      <h1 class="text-2xl font-bold">
        {{ allData.selectedGroupIndex.value + 1
        }}<span class="max-sm:hidden">.</span>
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
      <ConfiguratorOptionsMenu
        v-if="allData.componentToShow.value && allData.type.value === 1"
      />
      <ConfiguratorDimensionsMenu v-show="allData.type.value === 2" />
      <ConfiguratorDescription v-show="allData.type.value === 3" />
    </div>

    <ConfiguratorSidebar
      @menu-visible="toggleMenuVisible"
      :isMenuVisible="isMenuVisible"
      :class="{ 'max-sm:hidden': allData.isImageVisible.value }"
    />
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
