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

function selectedGroup(index: number, label: string) {
  console.log("sidebar menu");
  if (index === 0) {
    console.log("hello 1st index");
    setCurrentGroup(index);
    emit("showMenu");
  } else if (selectedLabel.value[index]) {
    console.log("selected options of that group");
    setCurrentGroup(index);
    emit("showMenu");
  } else if (
    selectedLabel.value[index - 2] &&
    groupsData.value[index - 1].required === 0
  ) {
    console.log("previous required is zero ");
    setCurrentGroup(index);
    emit("showMenu");
  }
}
</script>

<template>
  <!-- <div class="w-full  max-sm:opacity-50 relative" :class="{ 'max-sm:bg-transparent': !isMenuVisible }"> -->
  <!-- ref="sideBarMenu" -->
  <div
    class="w-full z-0 relative transition-all p-4 max-sm:rounded-t-2xl"
    :class="{ 'hidden sm:block': !isMenuVisible }"
  >
    <div
      class="flex justify-center max-sm:py-2 py-2"
      @click="$emit('showMenu')"
    >
      <span class="w-10 h-1 bg-black rounded items-center sm:hidden"></span>
    </div>

    <div class="sm:h-125 overflow-y-auto overflow-x-hidden">
      <div
        v-for="(groupData, index) in groupsData"
        class="py-2 border-b border-[#DEDAD4] flex items-center cursor-pointer"
      >
        <div
          @click="selectedGroup(index, groupData.groupLabel.value)"
          class="w-full bg-none text-start flex items-center gap-1"
          :class="{ 'font-bold': index === selectedGroupIndex }"
        >
          <span
            class="w-3 h-3 rotate-45 absolute -left-1.5 bg-white"
            :class="{ 'hidden': index !== selectedGroupIndex }"
          ></span>
          <div class="flex items-center gap-2">
            <p>{{ index + 1 }}.</p>
            <p class="w-24 hyphens-auto break-words" lang="de">
              {{ groupData.groupLabel }}
            </p>
          </div>

          <div
            class="text-red flex items-center gap-1 hyphens-auto break-words"
            v-if="selectedLabel[index]"
          >
            <IconsRedTick />
            {{ selectedLabel[index] || "" }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
