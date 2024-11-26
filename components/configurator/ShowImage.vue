<script setup lang="ts">
import { PROVIDED_KEY } from "~/constants";

const { setImageVisible, selectedGroupIndex }: any = inject(PROVIDED_KEY);
function handleClick() {
  setImageVisible();
}
</script>
<template>
  <div
    class="lg:w-[685px] md:w-[450px] max-sm:h-screen bg-gray-700 px-0 sm:px-6 flex flex-col justify-center items-end gap-6 relative"
  >
    <button
      @click="handleClick"
      class="flex items-center gap-2 text-white underline bg-transparent max-sm:absolute bottom-5 right-40"
    >
      <IconsCross />
      Detailansicht verlassen
    </button>
    
      <img
        v-if="selectedGroupIndex === 0"
        class="w-full h-[50%] sm:h-[70%] object-center"
        src="~/assets/images/mainPic.jpg"
        alt=""
      />
      <img
        v-else
        class="w-full h-[50%] sm:h-[70%] object-center"
        src="~/assets/images/optionsImg.png"
        alt=""
      />
  </div>
</template>
