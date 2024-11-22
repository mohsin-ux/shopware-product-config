<script setup lang="ts">
import { PROVIDED_KEY } from '~/constants';

const {
  filteredProfiles,
  selectedGroupIndex,
  selectedLabel,
  setCurrentProfile,
}: any = inject(PROVIDED_KEY);

const selectedProfileLabel = computed(
  () => selectedLabel.value[selectedGroupIndex.value]
);
function handleClick(index: number, label: string) {
  setCurrentProfile(index, label);
}
</script>

<template>
  <div class="lg:w-[636px] md:w-[420px] flex justify-center md:justify-start flex-wrap gap-3 overflow-y-auto">
    <div
      v-for="(label, index) in filteredProfiles"
      class="w-[160px] sm:w-[204px] h-[204px] border flex mt-2 relative hover:border-red hover:border-4 hover:p-1 transition-all"
      :class="{ 'border-red border-4 p-1': selectedProfileLabel === label }"
      @click="handleClick(index, label)"
    >
      <img
        class="object-cover"
        src="~/assets/images/mainPic.jpg"
        alt="something goes wrong"
      />
      <div class="w-8 h-8 bg-white rounded-full absolute right-2 top-2">
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
