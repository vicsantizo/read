import { useToggle } from './useToggle';
import './toggle.css';

type ToggleProps = {
  text: string;
  execute?: (...args: unknown[]) => unknown;
  state?: boolean;
};

export const Toggle = (props: ToggleProps) => {
  const { isActive, setIsActive } = useToggle(props.state);
  const width = 40;
  const height = 18;

  const handleClick = () => {
    setIsActive(!isActive);
    if (props.execute) props.execute();
  };

  return (
    <div className="toggle">
      <span role="presentation" className="toggle__label no-selection" onClick={handleClick}>
        {props.text}
      </span>
      <button onClick={handleClick} role="switch" aria-label={props.text} aria-checked={isActive}>
        <svg className="toggle__svg" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <rect className={`toggle__rect ${isActive && 'rect--move'}`} width={width} height={height} rx={height / 2} />
          <circle
            className={`toggle__circle ${isActive && 'circle--move'}`}
            cx={height / 2}
            cy={height / 2}
            r={height / 2}
          />
        </svg>
      </button>
    </div>
  );
};

export default Toggle;
