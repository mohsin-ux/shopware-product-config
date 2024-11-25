<script setup lang="ts">
// import { useFetchData } from "~/composables/configurator/fetchData";
import { PROVIDED_KEY } from "~/constants";
import SideBarMenu from "./SideBarMenu.vue";
// import SideBarMenu from "./SideBarMenu.vue";
const { kitchenzModalController }: any = inject("close");
const isMenuVisible = ref<boolean>(false);
const selectedLabelsArray = computed(() => Object.keys(selectedLabel.value));

const {
  price,
  selectedLabel,
  groupsData,
  nextGroupLabel,
  selectedGroupIndex,
  setCurrentGroup,
}: any = inject(PROVIDED_KEY);
const url =
  "https://kitchenz-shopware6.ddev.site/store-api/product-configurator/full-price-calculate";

function toggleMenuVisible() {
  console.log('hello world')
  isMenuVisible.value = !isMenuVisible.value;
}

function nextGroup() {
  if (
    selectedLabel.value[selectedGroupIndex.value] &&
    selectedLabelsArray.value.length - 1 < groupsData.value.length - 1
  ) {
    selectedGroupIndex.value++;
    setCurrentGroup(selectedGroupIndex.value);
  } else if (
    selectedLabelsArray.value.length - 1 === groupsData.value.length - 1 &&
    selectedGroupIndex.value === groupsData.value.length - 1
  ) {
    kitchenzModalController.close();
  }
}
function previousGroup() {
  selectedGroupIndex.value--;
  setCurrentGroup(selectedGroupIndex.value);
}
// const sideBarMenu = useTemplateRef("sideBarMenu");

// onClickOutside(sideBarMenu, (event) => {
//   toggleMenuVisible(event);
// });
</script>

<template>
  <div class="h-full relative bg-[#EEEDE8]">
    <div
      class="sm:flex sm:flex-col sm:justify-between bg-[#EEEDE8] -mt-4 sm:w-[310px] sm:h-full w-full box-border max-sm:fixed bottom-0"
    >
      <SideBarMenu
        :isMenuVisible="isMenuVisible"
        @showMenu="toggleMenuVisible"
      />

      <div class="w-full sm:p-4 md-w-[310px] flex flex-col items-center gap-2">
        <div class="w-full">
          <div
          
            class="w-full py-3 sm:p-2 sm:bg-white bg-[#EEEDE8] flex flex-col gap-2 justify-center items-center"
            :class="{
              'rounded-none bg-white ': isMenuVisible,
              'max-sm:rounded-t-2xl': !isMenuVisible,
            }"
          >
            <div
              class="p-2 w-full flex justify-center sm:hidden toggle"
              @click="toggleMenuVisible"
              :class="{ hidden: isMenuVisible }"
            >
              <!-- <div>{{ isMenuVisible }}</div> -->
              <span
                class="w-10 h-1 bg-black rounded"
                :class="{ hidden: isMenuVisible }"
              ></span>
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
            <span v-if="selectedGroupIndex < groupsData.length - 1"
              >Weiter mit {{ nextGroupLabel }}
            </span>
            <span v-else> In den Warenkorb </span>
          </button>
        </div>

        <button
          v-if="selectedGroupIndex > 0"
          @click="previousGroup"
          class="underline text-[#404855] text-sm font-normal max-sm:mb-3"
        >
          Ein Schritt zurück
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
