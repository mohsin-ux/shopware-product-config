<script setup lang="ts">
// import { useFetchData } from "~/composables/configurator/fetchData";
import SideBarMenu from "./SideBarMenu.vue";
const { kitchenzModalController }: any = inject("close");

const {
  price,
  selectedLabel,
  groupLabels,
  nextGroupLabel,
  selectedGroupIndex,
  setCurrentGroup,
}: any = inject("allData");
const url =
  "https://kitchenz-shopware6.ddev.site/store-api/product-configurator/full-price-calculate";

const isMenuVisible = ref<boolean>(false);
function toggleMenuVisible() {
  isMenuVisible.value = !isMenuVisible.value;
}
const selectedLabelsArray = computed(() => Object.keys(selectedLabel.value));

function nextGroup() {
  // console.log(`${selectedGroupIndex.value} it is the current method`);
  console.log();
  if (
    selectedLabel.value[selectedGroupIndex.value] &&
    selectedLabelsArray.value.length - 1 < groupLabels.value.length - 1
  ) {
    console.log(`${selectedLabelsArray.value.length} it is the next method`);
    selectedGroupIndex.value++;
    setCurrentGroup(selectedGroupIndex.value);
  } else if (
    selectedLabelsArray.value.length - 1 === groupLabels.value.length - 1 &&
    selectedGroupIndex.value === groupLabels.value.length - 1
  ) {
    console.log(`${selectedLabel.value.length} it is the last method`);
    kitchenzModalController.close();
  }

  //  else {
  //   useFetchData({
  //     url,
  //     method: "POST",
  //     headers: { "sw-access-key": "SWSCADD3ZW5YA01PDXY3WU44BA" },
  //     payload: {
  //       options: [
  //         {
  //           oid: "018b299e66ad7141b0ef8f85420c5903",
  //           value: null,
  //         },
  //       ],
  //       product_id: "acb605a270884227901c682ddd341038",
  //     },
  //   });
  // }
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
    <div class="w-full sm:p-4 md-w-[310px] flex flex-col items-center gap-2">
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
          <span v-if="selectedGroupIndex < groupLabels.length - 1"
            >Weiter mit {{ nextGroupLabel }}
          </span>
          <span v-else> In den Warenkorb </span>
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
<style></style>
