<script setup lang="ts">
import { PROVIDED_KEY } from "~/constants";

const {
  setImageVisible,
  filteredProfiles,
  selectedGroupIndex,
  selectedLabel,
  setCurrentProfile,
}: any = inject(PROVIDED_KEY);

const selectedProfileLabel = computed(
  () => selectedLabel.value[selectedGroupIndex.value]
);

let toggleValue = false;

// function handleClick(index: number, label: string) {
//   setCurrentProfile(index, label);
// }
function handleImageClick(index: number, label: string) {
  if (toggleValue === false) {
    setCurrentProfile(index, label);
  }
}

function handleSearchClick() {
  toggleValue = true;
  if (toggleValue === true) {
    setImageVisible();
  }
}
</script>

<template>
  <div
    class="lg:w-[636px] md:w-[420px] h-full flex max-[391px]:flex-col max-[391px]:items-center max-[391px]:justify-start items-start justify-center md:justify-start flex-wrap gap-3 overflow-y-auto"
  >
    <div  
      v-for="(label, index) in filteredProfiles"
      class="w-[165px] sm:w-[204px] h-[204px] border flex mt-2 relative hover:border-red hover:border-4 hover:p-1 transition-all cursor-pointer"
      :class="{ 'border-red border-4 p-1': selectedProfileLabel === label }"
      @click="handleImageClick(index, label)"
    >
      <img
        class="object-cover"
        src="~/assets/images/mainPic.jpg"
        alt="something goes wrong"
      />
      <div
        @click="handleSearchClick"
        class="w-8 h-8 bg-white rounded-full absolute right-2 top-2"
      >
        <IconsSearchRed class="absolute top-2 right-2" />
      </div>
      <p class="absolute bottom-1 left-2 text-white">
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
