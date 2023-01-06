import { AddIcon } from './AddIcon';

export type AddButtonProps = {
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const AddButton = ({ execute, disabled }: AddButtonProps) => {
  return (
    <button disabled={disabled ? true : false} className={'hover:opacity-50'} title="Add book" onClick={execute}>
      <AddIcon />
    </button>
  );
};

export default AddButton;
