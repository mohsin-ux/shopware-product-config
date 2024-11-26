import { useConfigData } from "~/utils/configData";
export const useConfigState = async () => {
  let currentProfileIndex = ref<number>(0);
  let currentGroupIndex = ref<number>(0);
  const { type, price, allProfilesLabels, groupsData, optionLabels } =
    await useConfigData(currentProfileIndex, currentGroupIndex);

  const selectedGroupLabel = ref<string>(groupsData.value[0].groupLabel);
  const selectedGroupIndex = ref<number>(0);
  const selectedLabel = ref<Record<number, string>>({});
  const filteredOptions = ref<string[]>(optionLabels.value);
  const filteredProfiles = ref<string[]>(allProfilesLabels.value);
  const componentToShow = computed(() => selectedGroupIndex.value !== 0);
  const inputValue = ref<string>("");
  const isMenuVisible = ref<boolean>(false);
  const isImageVisible = ref<boolean>(false);

  const nextGroupLabel = computed<string>(
    () => groupsData.value[selectedGroupIndex.value + 1].groupLabel
  );
  function setCurrentProfile(index: number, label: string) {
    currentProfileIndex.value = index;
    filteredOptions.value = optionLabels.value;
    selectedLabel.value = {};
    setSelectedLabel(label);
    currentGroupIndex.value++;
    setSelectedLabel(label);
    setSelectedGroupLabel(selectedGroupIndex.value + 1);
    setSelectedGroupIndex(selectedGroupIndex.value + 1);
  }
  function setCurrentOption(index: number, label: string) {
    setSelectedLabel(label);
    if (selectedGroupIndex.value < groupsData.value.length - 1) {
      currentGroupIndex.value++;
      setSelectedLabel(label);
      setSelectedGroupLabel(selectedGroupIndex.value + 1);
      setSelectedGroupIndex(selectedGroupIndex.value + 1);
    }                                                     
    filteredOptions.value = optionLabels.value;
  }
  function setCurrentGroup(index: number) {
    currentGroupIndex.value = index;
    selectedGroupIndex.value = index;
    setSelectedGroupLabel(selectedGroupIndex.value);
    setSelectedGroupIndex(selectedGroupIndex.value);
    filteredOptions.value = optionLabels.value;
  }
  function setImageVisible() {
    console.log(`hello it is the final testing ${isImageVisible.value}`); 
    isImageVisible.value = !isImageVisible.value;
  }

  function setSelectedLabel(label: string) {
    selectedLabel.value[selectedGroupIndex.value] = label;
  }

  function setSelectedGroupLabel(selectedGroupIndex: number) {
    selectedGroupLabel.value = groupsData.value[selectedGroupIndex].groupLabel;
  }
  function setSelectedGroupIndex(groupIndex: number) {
    selectedGroupIndex.value = groupIndex;
  }

  function setFilteredValues(profiles: string[], options: string[]) {
    filteredProfiles.value = profiles;
    filteredOptions.value = options;
  }


  return {
    isImageVisible,
    isMenuVisible,
    inputValue,
    filteredOptions,
    filteredProfiles,
    type,
    price,  
    componentToShow,
    selectedLabel,
    currentProfileIndex,
    optionLabels,
    allProfilesLabels,
    nextGroupLabel,
    selectedGroupIndex,
    selectedGroupLabel,
    groupsData,
    setCurrentOption,
    setCurrentGroup,
    setCurrentProfile,
    setFilteredValues,
    setImageVisible
  };
};
