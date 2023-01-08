import { EditIcon } from './EditIcon';

export type EditButtonProps = {
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const EditButton = ({ execute, disabled }: EditButtonProps) => {
  return (
    <button
      disabled={disabled ? true : false}
      className={`hover:opacity-50 ${disabled && 'opacity-20'}`}
      title="Edit book"
      onClick={execute}
    >
      <EditIcon />
    </button>
  );
};

export default EditButton;
