import { useState } from 'react';

export const useSelection = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const addSelection = (option: string) => {
    if (!selectedOptions.includes(option)) setSelectedOptions([...selectedOptions, option]);
  };

  const removeSelection = (option: string) => {
    const selectedOptionIndex = selectedOptions.indexOf(option);
    const isOptionSelected = selectedOptionIndex != -1;

    if (isOptionSelected) {
      const currentOptions = [...selectedOptions];
      currentOptions.splice(selectedOptionIndex, 1);
      setSelectedOptions([...currentOptions]);
    }
  };

  const isOptionSelected = (option: string) => {
    const selectedOptionIndex = selectedOptions.indexOf(option);
    const isOptionSelected = selectedOptionIndex != -1;
    return isOptionSelected;
  };

  return {
    selectedOptions,
    addSelection,
    removeSelection,
    isOptionSelected,
  };
};

export default useSelection;
