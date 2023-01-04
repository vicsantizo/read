import { useToggle } from './useToggle';
import './toggle.css';

type ToggleProps = {
  text: string;
};

export const Toggle = (props: ToggleProps) => {
  const { isActive, toggle } = useToggle();
  const width = 40;
  const height = 18;
  return (
    <div className="toggle">
      <span role="presentation" className="toggle__label no-selection" onClick={toggle}>
        {props.text}
      </span>
      <button onClick={toggle} role="switch" aria-label={props.text} aria-checked={isActive}>
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
