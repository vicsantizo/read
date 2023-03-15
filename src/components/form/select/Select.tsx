import { forwardRef, Ref, useEffect, useState } from 'react';
import { ArrowIcon } from '../../ui/arrowIcon';
import { SelectedOption } from './SelectedOption';
import { v4 as uuidv4 } from 'uuid';
import { useSelection } from './useSelection';
import { useListboxFocus } from './useListboxFocus';
import './select.css';

type SelectProps = {
  options: string[];
  onChange?: () => void;
};

export const Select = forwardRef(({ options, onChange }: SelectProps, ref: Ref<HTMLDivElement>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedOptions, addSelection, removeSelection, isOptionSelected } = useSelection();
  const { listboxRef, toggleOptionsListbox, handleListboxOptionSelection } = useListboxFocus(
    options,
    isExpanded,
    setIsExpanded,
    addSelection,
  );
  const controlId = uuidv4();
  const dropdownStyling = !isExpanded ? { display: 'none' } : {};
  const isOptionsSelectionEmpty = selectedOptions.length === 0;

  // effect to hide listbox when clicking out of the select element
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (!listboxRef.current?.parentNode?.contains(target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside, { signal: signal });

    return () => {
      controller.abort();
    };
  }, []);

  // Notify changes on selection
  useEffect(() => {
    if (onChange) onChange();
  }, [selectedOptions]);

  /** TODOs
   * - Receive options to be pre-selected allowing the consumer
   *   to have their own state for the component
   */

  return (
    <div
      tabIndex={0}
      role="combobox"
      ref={ref}
      className="select input"
      data-testid="select"
      data-value={JSON.stringify(selectedOptions)} // expose selected values
      aria-haspopup="listbox"
      aria-controls={controlId}
      aria-expanded={isExpanded}
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
      onKeyDown={toggleOptionsListbox}
    >
      {isOptionsSelectionEmpty && <span className="select__placeholder no-selection">Choose your options</span>}

      <span className="select__selections">
        {selectedOptions.map((selectedOption) => (
          <SelectedOption key={selectedOption} optionName={selectedOption} removeSelection={removeSelection} />
        ))}
      </span>

      <span className="select__arrow">
        <ArrowIcon isArrowUp={isExpanded} />
      </span>

      <ul
        ref={listboxRef}
        id={controlId}
        role="listbox"
        className="select__options"
        style={dropdownStyling}
        tabIndex={0}
      >
        {options.map((option) => (
          <li
            tabIndex={-1}
            key={option}
            role="option"
            className={`select__option no-selection ${isOptionSelected(option) ? 'select__option--highlight' : ''}`}
            aria-selected={isOptionSelected(option)}
            onKeyDown={(e) => {
              handleListboxOptionSelection(e, option);
            }}
            onClick={(e) => {
              e.stopPropagation();
              addSelection(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

Select.displayName = 'Select Element';

export default Select;
