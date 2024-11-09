<script setup lang="ts">
import type { Product } from "@shopware-pwa/types";
import SharedModal from "../shared/SharedModal.vue";
import { useFetchData } from "~/composables/configurator/fetchData";

const { error, loading }: any = useFetchData();
const { pushSuccess } = useNotifications();
const props = defineProps<{
  product: Product;
}>();
const { product } = toRefs(props);
const { codeErrorsNotification } = useCartNotification();
const { addToCart, quantity } = useAddToCart(product);

const addToCartProxy = async () => {
  await addToCart();
  codeErrorsNotification();
  pushSuccess(`${props.product?.translated?.name} has been added to cart.`);
};

// const loading = ref(true);
// onMounted(() => {
//   loading.value = false;
// });
const productQuantity = ref<number>(1);
function increment() {
  productQuantity.value++;
  console.log("hello sir why this is not comming");
}
function decrement() {
  productQuantity.value--;
}
const kitchenzModalController = useModal();
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
        class="py-2 px-6 mt-4 bg-sky-950 text-[#ffffff] border border-transparent flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        data-testid="add-to-cart-button"
        :disabled="loading"
        @click.prevent="kitchenzModalController.open"
      >
        konfigurieren
      </button>

      <SharedModal :controller="kitchenzModalController">
        <ProductConfigurator @success="kitchenzModalController.close" />
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
