import { Link } from 'react-router-dom';
import { TrackIcon } from '../../icons';

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
      <TrackIcon className="fill-[currentColor]" width={22} />
    </Link>
  );
};

export default TrackButton;
