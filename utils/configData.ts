import apiData from "~/static/kitchenz-response";

export const useConfigData = async (
  currentProfileIndex: Ref<number>,
  currentGroupIndex: Ref<number>
) => {
  const url =
    "https://shopware.grandmarkt.de/store-api/product-configurator/get-configuration/069be5c6d51244ee8d39a88f216f5978";

  const apiAllData = apiData;
  console.log(apiData);

  const parsedData: any = Object.values(apiAllData);
  console.log(parsedData);

  const firstGroupOfAllProfiles = parsedData.map(
    (profileData: any) => profileData.groups[0]
  );
  const allProfilesLabels = ref<string[]>(
    firstGroupOfAllProfiles.map((group: any) => {
      return `${group.options[0].label} (${group.options[0].labelId})`;
    })
  );
  console.log(allProfilesLabels.value);

  const groupsData = computed(() =>
    parsedData[currentProfileIndex.value].groups.map((group: any) => ({
      groupLabel: group.label,
      required: group.required,
    }))
  );

  const firstGroupOption = computed(() =>
    parsedData[currentProfileIndex.value].groups
      .filter((group: any, index: number) => index === 1)
      .map((group: any, index: number) =>
        group.options.map((option: any) => {
          return `${option.label} (${option.labelId})`;
        })
      )
      .flat()
  );

  const optionLabels = computed(() => {
    if (currentGroupIndex.value === 0) {
      return firstGroupOption.value;
    }
    return parsedData[currentProfileIndex.value].groups
      .filter((group: any, index: number) => index === currentGroupIndex.value)
      .map((group: any) =>
        group.options.map((option: any) => {
          return `${option.label} (${option.labelId})`;
        })
      )
      .flat();
  });

  const type = computed(
    () =>
      parsedData[currentProfileIndex.value].groups[currentGroupIndex.value].type
  );

  const price = computed(() => parsedData[currentProfileIndex.value].price);

  return {
    type,
    price,
    allProfilesLabels,
    groupsData,
    optionLabels,
  };
};
