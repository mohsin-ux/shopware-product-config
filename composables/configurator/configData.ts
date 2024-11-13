import { useFetchData } from "~/composables/configurator/fetchData";

export const useConfigData = async (
  currentProfileIndex: Ref<number>,
  currentGroupIndex: Ref<number>
) => {
  const url =
    "https://shopware.grandmarkt.de/store-api/product-configurator/get-configuration/069be5c6d51244ee8d39a88f216f5978";

  const { parsedData, loading} = await useFetchData({
    url: url,
    method: "GET",
    headers: { "sw-access-key": "SWSCADD3ZW5YA01PDXY3WU44BA" },
  });
  console.log(parsedData);

  const firstGroupOfAllProfiles = parsedData.map(
    (profileData: any) => profileData.groups[0]
  );
  const allProfilesLabels = ref<string[]>(
    firstGroupOfAllProfiles.map(
      (profilesLabel: any) => profilesLabel.options[0].label
    )
  );
  const groupLabels = computed(() =>
    parsedData[currentProfileIndex.value].groups.map(
      (group: any) => group.label
    )
  );

  const firstGroupOption = computed(() =>
    parsedData[currentProfileIndex.value].groups
      .filter((group: any, index: number) => index === 1)
      .map((group: any, index: number) =>
        group.options.map((option: any) => option.label)
      )
      .flat()
  );

  const optionLabels = computed(() => {
    if (currentGroupIndex.value === 0) {
      return firstGroupOption.value;
    }
    return parsedData[currentProfileIndex.value].groups
      .filter((group: any, index: number) => index === currentGroupIndex.value)
      .map((group: any) => group.options.map((option: any) => option.label))
      .flat();
  });
  const type = computed(
    () =>
      parsedData[currentProfileIndex.value].groups[currentGroupIndex.value].type
  );

  const price = computed(() => parsedData[currentProfileIndex.value].price);

  return { price, loading, type, allProfilesLabels, groupLabels, optionLabels};
};
