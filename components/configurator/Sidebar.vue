<script setup lang="ts">
import SideBarMenu from "./SideBarMenu.vue";
const {
  price,
  selectedLabel,
  nextGroupLabel,
  selectedGroupIndex,
  setCurrentGroup,
}: any = inject("sideBar");

const isMenuVisible = ref<boolean>(false);
function toggleMenuVisible() {
  isMenuVisible.value = !isMenuVisible.value;
}
function nextGroup() {
  if (selectedLabel.value[selectedGroupIndex.value]) {
    selectedGroupIndex.value++;
    setCurrentGroup(selectedGroupIndex.value, nextGroupLabel.value);
  }
}
function previousGroup() {
  selectedGroupIndex.value--;
  setCurrentGroup(selectedGroupIndex.value, nextGroupLabel.value);
}
</script>

<template>
  <div
    class="bg-[#EEEDE8] sm:flex sm:flex-col sm:justify-between -mt-4 sm:w-[340px] sticky bottom-0 box-border"
  >
    <SideBarMenu
      :isMenuVisible="isMenuVisible"
      @show-menu="toggleMenuVisible"
    />
    <div class="w-full sm:p-4 flex flex-col items-center gap-2">
      <div class="bg-red w-full">
        <div
          class="w-full py-3 sm:p-2 sm:bg-white flex flex-col gap-2 justify-center items-center max-sm:rounded-t-2xl"
          :class="{ 'bg-white': isMenuVisible }"
        >
          <div
            class="p-2 w-full flex justify-center sm:hidden"
            @click="toggleMenuVisible"
            :class="{ hidden: isMenuVisible }"
          >
            <span class="w-10 h-1 bg-black rounded"></span>
          </div>
          <p class="text-sm font-medium">
            Aktuelle Konfiguration: <span class="font-bold">€</span>
            <span class="text-lg font-bold">{{ price }}</span>
          </p>
        </div>
        <button
          @click="nextGroup"
          class="bg-[#404853] w-full p-5 sm:p-2 text-white text-base font-medium"
        >
          Weiter mit {{ nextGroupLabel }}
        </button>
      </div>

      <button
        v-if="selectedGroupIndex > 0"
        @click="previousGroup"
        class="underline text-[#404855] text-sm font-normal"
      >
        Ein Schritt zurück
      </button>
    </div>
  </div>
</template>
