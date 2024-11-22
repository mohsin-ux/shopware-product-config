<script setup lang="ts">
const props = defineProps<{
  isMenuVisible: boolean;
}>();
const emit = defineEmits<{
  (e: "showMenu"): void;
}>();

const {
  groupsData,
  selectedLabel,
  selectedGroupIndex,
  groupLabels,
  setCurrentGroup,
}: any = inject("allData");
// const labelsByGroup = ref<Record<number, string>>({});

function selectedGroup(index: number) {
  if (
    selectedLabel.value[index] ||
    groupsData.value[index + 1].required === 0
  ) {
    setCurrentGroup(index);
    emit("showMenu");
  }
}
</script>

<template>
  <div
    class="max-sm:rounded-lg w-full bg-kitchenz relative transition-all p-4"
    :class="{ 'hidden sm:block': !isMenuVisible }"
  >
    <div
      class="flex justify-center max-sm:py-2 py-2"
      @click="$emit('showMenu')"
    >
      <span class="w-10 h-1 bg-black rounded items-center sm:hidden"></span>
    </div>

    <div
      v-for="(groupData, index) in groupsData"
      class="py-2 border-b border-[#DEDAD4] flex items-center cursor-pointer"
    >
      <span
        class="w-3 h-3 rotate-45 absolute -left-1.5 bg-white"
        :class="{ hidden: index !== selectedGroupIndex }"
      ></span>
      <div
        @click="selectedGroup(index)"
        class="w-full bg-none text-start flex items-center gap-1"
        :class="{ 'font-bold': index === selectedGroupIndex }"
      >
        <div class="flex items-center gap-2">
          <p>{{ index + 1 }}.</p>
          <p class="w-24 hyphens-auto break-words" lang="de">
            {{ groupData.groupLabel }}
          </p>
        </div>
        <p>{{groupData.required}}</p>

        <div
          class="text-red flex items-center gap-1"
          v-if="selectedLabel[index]"
        >
          <IconsRedTick />
          {{ selectedLabel[index] || "" }}
        </div>
      </div>
    </div>
  </div>
</template>
