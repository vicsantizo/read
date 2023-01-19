import { DeleteIcon } from './DeleteIcon';

export type DeleteButtonProps = {
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const DeleteButton = ({ execute, disabled }: DeleteButtonProps) => {
  return (
    <button
      disabled={disabled ? true : false}
      className={`hover:opacity-50 ${disabled && 'opacity-20'}`}
      title="Edit book"
      onClick={execute}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
