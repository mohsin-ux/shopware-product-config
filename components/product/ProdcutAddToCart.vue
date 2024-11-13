<script setup lang="ts">
// import type { Product } from "@shopware-pwa/types";
import SharedModal from "../shared/SharedModal.vue";
import Loading from "~/components/product/Loading.vue";

// import { useConfigState } from "~/composables/configurator/configState";

// console.log(loading);

// const { pushSuccess } = useNotifications();
// const props = defineProps<{
//   product: Product;
// }>();
// const { product } = toRefs(props);
// const { codeErrorsNotification } = useCartNotification();
// const { addToCart, quantity } = useAddToCart(product);

// const addToCartProxy = async () => {
//   await addToCart();
//   codeErrorsNotification();
//   pushSuccess(`${props.product?.translated?.name} has been added to cart.`);
// };
const isRender = ref(false);
const pageLoading = ref(true);
onMounted(() => {
  pageLoading.value = false;
});
const productQuantity = ref<number>(1);
function increment() {
  productQuantity.value++;
}
function decrement() {
  productQuantity.value--;
}
const kitchenzModalController = useModal();

function handleRender() {
  console.log(
    "render function is called dynamically for this app and this functionality"
  );
  console.log(isRender.value);
  isRender.value = true;
}
function handleClick() {
  isRender.value = false;
  kitchenzModalController.open();
}
</script>

<template>
  <div class="flex flex-row">
    <div class="basis-1/3">
      <div
        class="border py-2 px-4 mt-4 border-solid border-1 border-black flex justify-between"
      >
        <button @click="decrement()" class="px-2 bg-white">
          <IconsMinus />
        </button>
        {{ productQuantity }}
        <button @click="increment()" class="px-2 bg-white">
          <IconsPlus />
        </button>
      </div>
    </div>
    <div class="basis-3/4 ml-4">
      <button
        class="py-2 px-6 mt-4 bg-sky-950 text-[#ffffff] border border-transparent flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="add-to-cart-button"
        :disabled="pageLoading"
        @click.prevent="handleClick"
      >
        konfigurieren
      </button>

      <SharedModal :controller="kitchenzModalController">
        <loading v-if="!isRender" />

        <ProductConfigurator @dataReady="handleRender" />
        <!-- @success="kitchenzModalController.close" -->
      </SharedModal>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
