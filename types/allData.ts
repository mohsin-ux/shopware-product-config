
type GroupsData = {
  groupLabel: string;
  required: number;
}
export type OptionsData = {
  label: string;
  labelId: string;
}
export type AllData = {
  isImageVisible: Ref<boolean>;
  filteredOptions: Ref<string[]>;
  filteredProfiles: Ref<string[]>;
  type: ComputedRef<number>;
  componentToShow: ComputedRef<boolean>;
  selectedLabel: Ref<Record<number, string>>;
  currentProfileIndex: Ref<number>;
  optionLabels: ComputedRef<string[]>;
  groupsData: ComputedRef<GroupsData[]>;
  allProfilesLabels: Ref<string[]>;
  nextGroupLabel: ComputedRef<string>;
  selectedGroupIndex: Ref<number>;
  selectedGroupLabel: Ref<string>;
  setCurrentOption: Function;
  setCurrentGroup: Function;
  setCurrentProfile: Function;
  setFilteredValues: Function;
  setImageVisible: Function;
};