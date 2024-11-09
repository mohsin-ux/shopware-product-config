<script setup lang="ts">
const { optionLabels, groupLabels, selectedGroupLabel }: any = inject("sideBar");
const inputValue = ref<string>("");
const filteredOptions = computed(() => {
  const valueToSearch = inputValue.value.toLowerCase();
  return optionLabels.filter((option: string) => option.toLowerCase().includes(valueToSearch));
})
const filteredGroups = computed(() => {
  const valueToSearch = inputValue.value.toLowerCase();
  return groupLabels.filter((group: string) => group.toLowerCase().includes(valueToSearch));
})

</script>

<template>
  <div class="relative">
    <input
      class="border border-grey_light bg-[#F8F8FA] text-kitchenz_blue outline-none w-full py-1.5 px-2 rounded"
      :placeholder="`Nach ${selectedGroupLabel} suchen`"
      type="text"
      v-model="inputValue"
    />
    <IconsSearchBlack class="absolute right-3 top-2" />
  </div>
</template>
