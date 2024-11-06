<script setup lang="ts">
  import { getCategoryBreadcrumbs } from "@shopware-pwa/helpers-next";

  const props = defineProps<{
    navigationId: string;
  }>();

  const { search } = useProductSearch();

  const { data: productResponse, error } = await useAsyncData(
    "cmsProduct" + props.navigationId,
    async () => {
      const productResponse = await search(props.navigationId, {
        withCmsAssociations: true,
      });
      return productResponse;
    }
  );

  if (!productResponse.value) {
    console.error("[FrontendDetailPage.vue]", error.value?.message);
    throw error.value;
  }

  useProductJsonLD(productResponse.value.product);

  const breadcrumbs = getCategoryBreadcrumbs(
    productResponse.value.product.seoCategory,
    {
      startIndex: 2,
    }
  );
  useBreadcrumbs(breadcrumbs);

  const { product } = useProduct(
    productResponse.value.product,
    productResponse.value.configurator
  );

  useCmsHead(product, { mainShopTitle: "Shopware Frontends Demo Store" });
</script>

<template>
  <LayoutBreadcrumbs />
  <div class="container mx-auto bg-white flex flex-col">
    <ProductStatic :product="product" />
  </div>
</template>
