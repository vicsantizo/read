import { useEffect, useRef, useState, KeyboardEvent } from 'react';

export const useListboxFocus = (
  options: string[],
  isListboxExpanded: boolean,
  setIsListboxExpanded: (value: boolean) => void,
  addSelection: (option: string) => void,
) => {
  const [focusedOptionIndex, setFocusOptionIndex] = useState(0);
  const listboxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isListboxExpanded) {
      focusOnFirstListboxOption();
    }
  }, [isListboxExpanded]);

  const toggleOptionsListbox = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Enter':
      case 'Space':
      case 'ArrowDown':
      case 'ArrowUp': {
        if (!isListboxExpanded) {
          setIsListboxExpanded(true);
        }
        break;
      }
    }
  };

  const focusOnFirstListboxOption = () => {
    const firstOption = listboxRef.current?.children[0] as HTMLElement;
    firstOption?.focus();
    setFocusOptionIndex(0);
  };

  const handleListBoxFocus = (direction: 'up' | 'down') => {
    if (direction === 'down') {
      const optionsLength = options.length - 1;
      if (optionsLength > focusedOptionIndex) {
        const allOptions = listboxRef.current?.children ?? [];
        const nextOption = allOptions[focusedOptionIndex + 1] as HTMLElement;
        nextOption?.focus({ preventScroll: true });
        setFocusOptionIndex(focusedOptionIndex + 1);
      }
    } else if (direction === 'up') {
      if (focusedOptionIndex > 0) {
        const allOptions = listboxRef.current?.children ?? [];
        const nextOption = allOptions[focusedOptionIndex - 1] as HTMLElement;
        nextOption?.focus({ preventScroll: true });
        setFocusOptionIndex(focusedOptionIndex - 1);
      }
    }
  };

  const handleListboxOptionSelection = (e: KeyboardEvent, option: string) => {
    e.stopPropagation();
    switch (e.code) {
      case 'Space':
      case 'Enter': {
        addSelection(option);
        break;
      }
      case 'ArrowDown': {
        handleListBoxFocus('down');
        break;
      }
      case 'ArrowUp': {
        handleListBoxFocus('up');
        break;
      }
      case 'Tab':
      case 'Escape': {
        setIsListboxExpanded(false);
        break;
      }
    }
  };

  return {
    listboxRef,
    toggleOptionsListbox,
    handleListboxOptionSelection,
  };
};

export default useListboxFocus;
