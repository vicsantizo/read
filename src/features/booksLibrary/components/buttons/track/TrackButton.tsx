import { Link } from 'react-router-dom';
import { TrackIcon } from './TrackIcon';

export type TrackButtonProps = {
  to: string;
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const TrackButton = ({ execute, disabled, to }: TrackButtonProps) => {
  return (
    <Link
      to={to}
      title="Track progress"
      className={`flex items-center hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (execute) execute();
      }}
    >
      <TrackIcon />
    </Link>
  );
};

export default TrackButton;
