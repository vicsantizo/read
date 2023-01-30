import { Link } from 'react-router-dom';
import { EditIcon } from '../../icons';

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
      <EditIcon className="mb-1 ml-1 fill-[currentColor]" width={22} />
    </Link>
  );
};

export default EditButton;
