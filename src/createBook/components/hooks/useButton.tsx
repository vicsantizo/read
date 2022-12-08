import { ReactElement, useReducer } from 'react';
import { Spinner } from '../Spinner';

type ButtonState = {
  content: string | ReactElement;
  disabled: boolean;
};

const initalButtonState: ButtonState = {
  content: 'Add',
  disabled: false,
};

enum ActionKind {
  INPUT = 'ADD',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type Action = {
  type: ActionKind;
};

function reducer(state: ButtonState, action: Action): ButtonState {
  switch (action.type) {
    case ActionKind.INPUT: {
      return {
        content: 'Add',
        disabled: false,
      };
    }
    case ActionKind.LOADING: {
      return {
        content: 'Loading...',
        disabled: true,
      };
    }
    case ActionKind.FAILURE: {
      return {
        content: <Spinner success={false} />,
        disabled: true,
      };
    }
    case ActionKind.SUCCESS: {
      return {
        content: <Spinner success={true} />,
        disabled: true,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const useButton = () => {
  const [buttonState, setButtonState] = useReducer(reducer, initalButtonState);
  return {
    buttonState,
    setButtonState,
    ActionKind,
  };
};

export default useButton;
