<script setup lang="ts">
import { ShallowRefMarker } from "@vue/reactivity";
import { PROVIDED_KEY } from "~/constants";
// const refImage = useTemplateRef('image');
const refSearch = useTemplateRef("search");
const hello = Object.values(refSearch);
const firstRef = ref(hello[0]);

const {
  setImageVisible,
  filteredOptions,
  selectedLabel,
  selectedGroupIndex,
  setCurrentOption,
}: any = inject(PROVIDED_KEY);

const selectedOptionLabel = computed(
  () => selectedLabel.value[selectedGroupIndex.value]
);

let toggleValue = false

function handleImageClick(index: number, label: string) {
  if (toggleValue === false) {
    setCurrentOption(index, label);
  }
}

function handleSearchClick() {
  toggleValue = true
  if (toggleValue === true) {
    setImageVisible();
  }
}
</script>

<template>
  <div
    class="lg:w-[636px] md:w-[450px] sm:h-full h-screen flex justify-center md:justify-start flex-wrap gap-3 max-[391px]:flex-col max-[391px]:items-center max-[391px]:justify-start overflow-y-auto"
  >
    <div
      v-for="(label, index) in filteredOptions"
      :key="index"
      class="w-[165px] sm:w-[204px] h-[215px] border flex flex-col items-center gap-2 py-3 px-2 mt-2 relative hover:border-red hover:border-4 hover:p-1 transition-all cursor-pointer overflow-hidden"
      :class="{
        'border-red border-4 p-1': selectedOptionLabel === label,
      }"
      @click="handleImageClick(index, label)"
    >
      <img
        class="object-cover w-[140px] h-[140px]"
        src="~/assets/images/optionsImg.png"
        alt="something goes wrong"    
      />
      <div
        ref="search"
        @click="handleSearchClick"
        class="w-8 h-8 bg-white rounded-full absolute right-1 top-1 shadow-[0_1px_1px_0px_rgba(0,0,0,0.25)]"
      >
        <IconsSearchRed class="absolute top-2 right-2" />
      </div>
      <p class="text-black font-bold">
        {{ label }}
      </p>
    </div>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
