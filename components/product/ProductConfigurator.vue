<script setup lang="ts">
import { useConfigState } from "~/composables/configurator/configState";
const {
  loading,
  filteredOptions,
  filteredProfiles,
  price,
  type,
  componentToShow,
  selectedLabel,
  currentProfileIndex,
  optionLabels,
  allProfilesLabels,
  nextGroupLabel,
  selectedGroupIndex,
  selectedGroupLabel,
  selectedChoiceByGroup,
  groupLabels,
  setCurrentOption,
  setCurrentGroup,
  setCurrentProfile,
  setFilteredValues,
}: any = await useConfigState();
const emit = defineEmits<{
  (e: "dataReady"): void;
}>();
onMounted(() => {
  emit("dataReady");
});

provide("allData", {
  filteredOptions,
  filteredProfiles,
  price,
  type,
  componentToShow,
  selectedLabel,
  currentProfileIndex,
  optionLabels,
  allProfilesLabels,
  nextGroupLabel,
  selectedGroupIndex,
  selectedGroupLabel,
  selectedChoiceByGroup,
  groupLabels,
  setCurrentOption,
  setCurrentGroup,
  setCurrentProfile,
  setFilteredValues,
});
</script>

<template>
  <div
    class="sm:flex h-screen sm:max-h-[672px] md:w-[1000px] relative overflow-y-auto overflow-x-hidden"
  >
    <div class="p-6 pb-0 flex flex-col gap-3">
      <h1 class="text-2xl font-bold">
        {{ selectedGroupIndex + 1 }}.
        <span class="text-base font-normal sm:hidden"
          >/{{ groupLabels.length }}</span
        >

        {{ selectedGroupLabel }} <span v-if="type !== 3"> wählen </span>
      </h1>
      <ConfiguratorSearch v-if="type !== 3" />
      <ConfiguratorProfileMenu v-show="!componentToShow && type === 1" />
      <ConfiguratorOptionsMenu v-show="componentToShow && type === 1" />
      <ConfiguratorPriceMenu v-show="type === 2" />
      <ConfiguratorReview v-show="type === 3" />
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
