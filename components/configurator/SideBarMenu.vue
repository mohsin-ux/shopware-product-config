<script setup lang="ts">
const props = defineProps<{
  isMenuVisible: boolean;
}>();
const emit = defineEmits<{
  (e: "showMenu"): void;
}>();

// const refSideBar = useTemplateRef("sideBarMenu");
const {
  groupsData,
  selectedLabel,
  selectedGroupIndex,
  groupLabels,
  setCurrentGroup,
}: any = inject("allData");

function handleClick(index: number, label: string) {
  if (index === 0) {
    setCurrentGroup(index);
    emit("showMenu");
  } else if (selectedLabel.value[index] || selectedLabel.value[index - 1]) {
    setCurrentGroup(index);
    emit("showMenu");
  } else if (
    groupsData.value[index - 1].required === 0 &&
    selectedLabel.value[index - 2]
  ) {
    setCurrentGroup(index);
    emit("showMenu");
  }
}
// onClickOutside(refSideBar, () => {
//   emit("showMenu");
// })
</script>

<template>
  <div
    ref="sideBarMenu"
    class="w-full sm:h-125 z-0 transition-all p-4 max-sm:rounded-t-2xl sm:overflow-y-auto sm:overflow-x-hidden relative"
    :class="{ 'hidden sm:block': !isMenuVisible }"
  >
    <div
      class="flex justify-center max-sm:py-2 py-2"
      @click="$emit('showMenu')"
    >
      <span class="w-10 h-1 bg-black rounded items-center sm:hidden"></span>
    </div>

    <!-- <div cla"> -->
    <div
      v-for="(groupData, index) in groupsData"
      class="py-2 border-b border-[#DEDAD4] flex items-center cursor-pointer"
    >
      <div
        @click="handleClick(index, groupData.groupLabel.value)"
        class="w-full bg-none text-start flex items-center gap-1"
        :class="{ 'font-bold': index === selectedGroupIndex }"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-3 h-3 rotate-45 absolute -left-1.5 bg-white"
            :class="{ hidden: index !== selectedGroupIndex }"
          ></span>
          <p>{{ index + 1 }}.</p>
          <p class="w-24 hyphens-auto break-words text-[14px]" lang="de">
            {{ groupData.groupLabel }}
          <span v-if="groupData.required" class="text-[#DA6649]">*</span>

          </p>
        </div>

        <div
          class="text-[#DA6649] text-[14px] flex items-center gap-1 hyphens-auto break-words"
          v-if="selectedLabel[index]"
        >
          <IconsRedTick />
          {{ selectedLabel[index] || "" }}
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
