<script setup lang="ts">
const { setCurrentOption }: any = inject("allData");
const userInput = ref<string>("");
let typingTimer: any = null;
function triggerFunction() {
  setCurrentOption(0, userInput.value);
}
function handleInput() {
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    triggerFunction();
  }, 2000);
}
</script>

<template>
  <div class=" flex flex-col gap-6">
    <div>
      <p class="text-lg font-normal text-[#404855]">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </p>
    </div>

    <textarea
      class="px-3 py-2 w-full h-[210px] border-2 border-grayn placeholder:text-grey placeholder:text-lg"
      placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
      v-model="userInput"
      @input="handleInput"
    ></textarea>
  </div>
</template>
