<script setup lang="ts">
const { optionLabels }: any = inject("allData");
</script>

<template>
  <div class="lg:w-[636px]  flex flex-wrap gap-y-8">
    <div v-for="optionLabel in optionLabels" class="w-1/2">
      <img src="~/assets/images/configImage.png" alt="" />
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <span class="px-1.5 rounded-full bg-red">A</span>
          <h3 class="text-2xl font-bold">{{ optionLabel }}</h3>
        </div>
        <div class="bg-white w-fit p-2 border">
          <input
            class="w-32 text-base font-medium"
            placeholder="20 bis 119 cm"
            type="text"
            name=""
            id=""
          />
          <span class="border-l p-2">cm</span>
        </div>
      </div>
    </div>
  </div>
</template>
