<script setup lang="js">
let loading = ref(false);

setTimeout(() => {
  loading.value = !loading.value;
}, 7000);
</script>
<template>
  <div
    v-if="loading"
    class="sm:flex h-screen relative overflow-y-auto overflow-x-hidden w-full max-sm:bg-red max-lg:w-[500px] sm:w-[600px] md:w-[800px] lg:w-[1000px] flex flex-col gap-10 justify-center items-center"
  >
    <h1 class="text-7xl font-bold ml-5">Error 505</h1>
    <p class="text-lg ml-5">Please Try Again...</p>
  </div>
  <div
    v-else
    class="sm:flex h-screen relative overflow-y-auto overflow-x-hidden w-full max-sm:bg-red max-lg:w-[500px] sm:w-[600px] md:w-[800px] lg:w-[1000px] flex flex-col gap-10 justify-center items-center"
  >
    <div
      class="w-25 h-25 animate-spin rounded-full border-8 border-solid border-current border-r-transparent"
    ></div>
    <h1 class="text-2xl font-bold ml-5">Loading...</h1>
  </div>
</template>
