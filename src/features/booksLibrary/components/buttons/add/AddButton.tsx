import { Link } from 'react-router-dom';
import { AddIcon } from './AddIcon';

export type AddButtonProps = {
  to: string;
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const AddButton = ({ execute, disabled, to }: AddButtonProps) => {
  return (
    <Link
      to={to}
      title="Add Book"
      className={`flex items-center hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (execute) execute();
      }}
    >
      <AddIcon />
    </Link>
  );
};

export default AddButton;
