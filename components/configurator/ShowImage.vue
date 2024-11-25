<script setup lang="ts">
import { PROVIDED_KEY } from "~/constants";

const { setImageVisible }: any = inject(PROVIDED_KEY);
function handleClick() {
    setImageVisible();
}
</script>
<template>
  <div
    class="lg:w-[636px] md:w-[450px] bg-gray-700 z-10 px-6 flex flex-col justify-center items-end gap-6"
  >
    <button
      @click="handleClick"
      class="flex items-center gap-2 text-white underline bg-transparent"
    >
      <IconsCross />
      Detailansicht verlassen
    </button>
    <img
      class="w-full h-[70%] object-center"
      src="~/assets/images/mainPic.jpg"
      alt=""
    />
  </div>
</template>
