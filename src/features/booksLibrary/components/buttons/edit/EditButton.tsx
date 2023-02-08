import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../../icons';

export type EditButtonProps = {
  to: string;
  execute?: (...arg: unknown[]) => unknown;
  disabled?: boolean;
};

export const EditButton = ({ execute, disabled, to }: EditButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      title="Edit Book"
      disabled={disabled}
      className={`flex items-center hover:opacity-50 ${disabled && 'opacity-20 hover:cursor-not-allowed'}`}
      onClick={(e) => {
        navigate(`${to}`);
        if (disabled) e.preventDefault();
        if (execute) execute();
      }}
    >
      <EditIcon className="mb-1 ml-1 fill-[currentColor]" width={22} />
    </button>
  );
};

export default EditButton;
