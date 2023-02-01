import { DeleteIcon } from '../../icons';

export type DeleteButtonProps = {
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const DeleteButton = ({ execute, disabled }: DeleteButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      title="Delete book"
      onClick={execute}
    >
      <DeleteIcon className={'mb-[2px] fill-[currentColor] stroke-2'} width={22} />
    </button>
  );
};

export default DeleteButton;
