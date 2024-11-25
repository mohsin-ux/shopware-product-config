<script setup lang="ts">
import { PROVIDED_KEY } from "~/constants";

const {
  inputValue,
  optionLabels,
  allProfilesLabels,
  selectedGroupLabel,
  selectedGroupIndex,
  setFilteredValues,
}: any = inject(PROVIDED_KEY);



const filteredOptions = computed<null | string[]>(() => {
  console.log(inputValue.value);
  const valueToSearch = inputValue.value.toLowerCase();
  if (selectedGroupIndex.value === 0) return allProfilesLabels.value;
  return optionLabels.value.filter((option: string) =>
    option.toLowerCase().includes(valueToSearch)
  );
});

const filteredProfiles = computed<string[]>(() => {
  console.log(inputValue.value);
  const valueToSearch = inputValue.value.toLowerCase();
  if (selectedGroupIndex.value !== 0) return optionLabels.value;
  return allProfilesLabels.value.filter((profile: string) =>
    profile.toLowerCase().includes(valueToSearch)
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
