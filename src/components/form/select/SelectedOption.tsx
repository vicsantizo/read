type SelectedOptionProps = {
  optionName: string;
  removeSelection: (option: string) => void;
};

export const SelectedOption = ({ optionName, removeSelection }: SelectedOptionProps) => {
  return (
    <button
      className="selection"
      data-testid="selection"
      aria-label={`remove ${optionName} selection`}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        removeSelection(optionName);
      }}
    >
      <span className="selection__text">{optionName.toLowerCase()}</span>
      <span aria-hidden="true" className="selection__x">
        x
      </span>
    </button>
  );
};

export default SelectedOption;
