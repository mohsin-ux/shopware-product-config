import { useConfigData } from "~/composables/configurator/configData";
export const useConfigState = async () => {
  let currentProfileIndex = ref<number>(0);
  let currentGroupIndex = ref<number>(0);
  const { price, type, allProfilesLabels, groupLabels, optionLabels } =
    await useConfigData(currentProfileIndex, currentGroupIndex);

  const selectedGroupLabel = ref<string>(groupLabels.value[0]);
  const selectedGroupIndex = ref<number>(0);
  const selectedLabel = ref<Record<number, string>>({});

  const nextGroupLabel = computed<string>(
    () => groupLabels.value[selectedGroupIndex.value + 1]
  );
  const componentToShow = computed(
    () => selectedGroupLabel.value !== "Produktlinie"
  );
  function setCurrentProfile(index: number, label: string) {
    currentProfileIndex.value = index;
    selectedLabel.value = {};
    setSelectedLabel(label);
    currentGroupIndex.value++;
    console.log(currentGroupIndex.value); 
    setSelectedLabel(label);
    setSelectedGroupLabel(selectedGroupIndex.value + 1);
    setSelectedGroupIndex(selectedGroupIndex.value + 1);
    // setNextGroupLabel(selectedGroupIndex.value);
  }
  function setCurrentOption(index: number, label: string) {
    setSelectedLabel(label);
    
    if (selectedGroupIndex.value < groupLabels.value.length - 1) {
      currentGroupIndex.value++;
      console.log(`this is the last index or not`)
      setSelectedLabel(label);
      setSelectedGroupLabel(selectedGroupIndex.value + 1);
      setSelectedGroupIndex(selectedGroupIndex.value + 1);
    }
  }
  function setCurrentGroup(index: number, currentGroupLabel: string) {
    currentGroupIndex.value = index;
    selectedGroupIndex.value = index;
    setSelectedGroupLabel(selectedGroupIndex.value);
    setSelectedGroupIndex(selectedGroupIndex.value);
  }

  function setSelectedLabel(label: string) {
    selectedLabel.value[selectedGroupIndex.value] = label;
  }

  function setSelectedGroupLabel(selectedGroupIndex: number) {
    selectedGroupLabel.value = groupLabels.value[selectedGroupIndex];
  }
  function setSelectedGroupIndex(groupIndex: number) {
    selectedGroupIndex.value = groupIndex;
  }

  return {
    price,
    type,
    componentToShow,
    selectedLabel,
    currentProfileIndex,
    optionLabels,
    allProfilesLabels,
    nextGroupLabel,
    selectedGroupIndex, 
    selectedGroupLabel,
    groupLabels,
    setCurrentOption,
    setCurrentGroup,
    setCurrentProfile,
  };
};
