<script setup lang="ts">
import type { Product, ProductReview } from "@shopware-pwa/types";
import {
  getProductRoute,
  getTranslatedProperty,
} from "@shopware-pwa/helpers-next";
import ProdcutAddToCart from "./ProdcutAddToCart.vue";

const props = defineProps<{
  product: Product;
}>();
const { product } = toRefs(props);
const router = useRouter();

const productName = computed(() =>
  getTranslatedProperty(props.product, "name")
);
const manufacturerName = computed(() =>
  getTranslatedProperty(props.product.manufacturer, "name")
);

const description = computed(() =>
  getTranslatedProperty(props.product, "description")
);
const properties = computed(() => props.product?.properties || []);
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="flex flex-row flex-wrap justify-start">
    <!-- Product name for mobile view -->
    <div class="basis-12/12 display lg:hidden">
      <h1
        class="pl-4 py-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
        v-html="productName"
      />
    </div>
    <div class="basis-12/12 lg:basis-7/12 product-gallery overflow-hidden">
      <!-- <ProductGallery :product="product" /> -->
    </div>
    <div class="basis-12/12 lg:basis-5/12 product-description">
      <!-- Product info -->
      <div
        class="max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pb-24 lg:pl-16 lg:pr-0"
      >
        <!-- Product name starting from lg breakpoint -->
        <div
          class="hidden lg:block text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
          v-html="productName"
        />

        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <h2 class="sr-only">Product information</h2>
          <div class="product-variants mt-10">
            <ProductPrice :product="product" />
            <ProductUnits :product="product" class="text-sm" />
            <!-- <ProductVariantConfigurator @change="handleVariantChange" /> -->
            <ProdcutAddToCart :product="product" />
          </div>
        </div>

        <div
          class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8"
        >
          <div class="container mx-auto mb-8">
            <!-- Description and details -->
            <div v-if="description">
              <h3 class="text-sm font-bold text-gray-900">
                {{ $t("product.description") }}
              </h3>
              <div class="mt-4 space-y-6">
                <div class="text-base text-gray-900" v-html="description" />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
