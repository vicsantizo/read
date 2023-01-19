import { Link } from 'react-router-dom';
import { EditIcon } from './EditIcon';

export type EditButtonProps = {
  to: string;
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const EditButton = ({ execute, disabled, to }: EditButtonProps) => {
  return (
    <Link
      to={to}
      title="Edit Book"
      className={`flex items-center hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (execute) execute();
      }}
    >
      <EditIcon />
    </Link>
  );
};

export default EditButton;
