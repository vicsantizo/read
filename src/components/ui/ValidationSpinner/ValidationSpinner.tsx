import './spinner.css';
import { useSpinner, SpinnerStates } from './useSpinner';

export type ValidationSpinnerProps = {
  state: SpinnerStates;
};

export const ValidationSpinner = ({ state }: ValidationSpinnerProps) => {
  const { icon, status, spinner } = useSpinner(state);
  return (
    <div className="flex items-center justify-center w-[100%]">
      <svg ref={icon} width={20} className="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          ref={status}
          className="status hide"
          d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm-.48 17L6 12.79l1.83-2.37L11.14 13l4.51-5.08 2.24 2Z"
        />
        <path ref={spinner} className="spinner hide" d="M2 12C2 6.47715 6.47715 2 12 2v3c-3.86599 0-7 3.13401-7 7H2Z" />
      </svg>
    </div>
  );
};

export default ValidationSpinner;
