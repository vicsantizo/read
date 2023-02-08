import { useNavigate } from 'react-router-dom';
import { TrackIcon } from '../../icons';

export type TrackButtonProps = {
  to: string;
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const TrackButton = ({ execute, disabled, to }: TrackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      disabled={disabled}
      title="Track progress"
      className={`flex items-center hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (execute) execute();
        navigate(`${to}`);
      }}
    >
      <TrackIcon className="fill-[currentColor]" width={22} />
    </button>
  );
};

export default TrackButton;
