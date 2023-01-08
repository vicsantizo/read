import { TrackIcon } from './TrackIcon';

export type TrackButtonProps = {
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const TrackButton = ({ execute, disabled }: TrackButtonProps) => {
  return (
    <button
      disabled={disabled ? true : false}
      className={`hover:opacity-50 ${disabled && 'opacity-20'}`}
      title="Track progress"
      onClick={execute}
    >
      <TrackIcon />
    </button>
  );
};

export default TrackButton;
