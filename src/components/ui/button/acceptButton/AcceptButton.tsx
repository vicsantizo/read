import { useButtonValidationAnimation, ButtonAction } from './useButtonValidationAnimation';

export type AcceptButtonProps = {
  execute?: (...args: unknown[]) => unknown;
  disable?: boolean;
  cleanup?: (...args: unknown[]) => unknown;
};

export const AcceptButton = ({ execute, disable, cleanup }: AcceptButtonProps) => {
  const { buttonState, setButtonState } = useButtonValidationAnimation();
  return (
    <button
      disabled={buttonState.disabled || disable}
      className={`bg-[var(--success-500)] hover:opacity-70 text-sm text-white font-semibold py-2 px-5 rounded-md w-full ${
        disable && 'opacity-50'
      }`}
      onClick={async () => {
        if (execute) {
          try {
            setButtonState({ type: ButtonAction.LOADING });
            await execute();
            setButtonState({ type: ButtonAction.SUCCESS });
            setTimeout(() => {
              if (cleanup) cleanup();
              setButtonState({ type: ButtonAction.INITIAL });
            }, 3000);
          } catch (error) {
            setButtonState({ type: ButtonAction.FAILURE });
            setTimeout(() => {
              setButtonState({ type: ButtonAction.INITIAL });
            }, 3000);
          }
        }
      }}
    >
      {buttonState.value}
    </button>
  );
};

export default AcceptButton;
