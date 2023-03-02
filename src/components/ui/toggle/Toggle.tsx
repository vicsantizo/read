import { ToggleIcon } from './ToggleIcon';
import { useToggle } from './useToggle';
import './toggle.css';

type ToggleProps = {
  label: string;
  initialValue?: boolean;
  toggleAction?: (...args: unknown[]) => void;
};

export const Toggle = ({ label, initialValue = false, toggleAction }: ToggleProps) => {
  const { toggleStatus, handleClick } = useToggle(initialValue, toggleAction);

  return (
    <div className="toggle">
      <span role="presentation" className="toggle__label no-selection" onClick={handleClick} data-testid="toggle-label">
        {label}
      </span>

      <button onClick={handleClick} role="switch" aria-checked={toggleStatus} data-testid="toggle">
        <ToggleIcon isToggled={toggleStatus} />
      </button>
    </div>
  );
};

export default Toggle;
