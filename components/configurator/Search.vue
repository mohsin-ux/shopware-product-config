<script setup lang="ts">
const {
  optionLabels,
  allProfilesLabels,
  selectedGroupLabel,
  setFilteredValues,
}: any = inject("allData");
const inputValue = ref<string>("");

// const filteredOptions = ref<string[] | null>(null);
const filteredOptions = computed<null | string[]>(() => {
  const valueToSearch = inputValue.value.toLowerCase();
  return optionLabels.value.filter((option: string) =>
    option.toLowerCase().includes(valueToSearch)
  );
});

const filteredProfiles = computed<null | string[]>(() => {
  const valueToSearch = inputValue.value.toLowerCase();
  return allProfilesLabels.value.filter((group: string) =>
    group.toLowerCase().includes(valueToSearch)
  );
});
function handleInputEvent() {
  setFilteredValues(filteredProfiles.value, filteredOptions.value);
}
</script>

<template>
  <div class="relative">
    <input
      class="border border-grey_light bg-[#F8F8FA] text-kitchenz_blue outline-none w-full py-1.5 px-2 rounded"
      :placeholder="`Nach ${selectedGroupLabel} suchen`"
      type="text"
      v-model="inputValue"
      @input="handleInputEvent"
    />
    <IconsSearchBlack class="absolute right-3 top-2" />
  </div>
</template>
