type ToggleIconProps = {
  isToggled: boolean;
  height?: number;
  width?: number;
};

export const ToggleIcon = ({ isToggled, height = 18, width = 40 }: ToggleIconProps) => {
  return (
    <svg className="toggle__svg" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <rect className={`toggle__rect ${isToggled && 'rect--move'}`} width={width} height={height} rx={height / 2} />
      <circle
        className={`toggle__circle ${isToggled && 'circle--move'}`}
        cx={height / 2}
        cy={height / 2}
        r={height / 2}
      />
    </svg>
  );
};

export default ToggleIcon;
