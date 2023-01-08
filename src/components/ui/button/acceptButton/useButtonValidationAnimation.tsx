import { useReducer, ReactElement } from 'react';
import { ValidationSpinner } from '../../ValidationSpinner';

type ButtonState = {
  value: ReactElement | string;
  disabled: boolean;
};

const initialState = {
  value: 'Accept',
  disabled: false,
};

type Action = {
  type: ButtonAction;
};

export enum ButtonAction {
  INITIAL = 'ADD',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

const reducer = (state: ButtonState, action: Action) => {
  switch (action.type) {
    case ButtonAction.INITIAL: {
      return {
        value: 'Accept',
        disabled: false,
      };
    }
    case ButtonAction.LOADING: {
      return {
        value: <ValidationSpinner state={'LOADING'} />,
        disabled: true,
      };
    }
    case ButtonAction.SUCCESS: {
      return {
        value: <ValidationSpinner state={'SUCCESS'} />,
        disabled: true,
      };
    }

    case ButtonAction.FAILURE: {
      return {
        value: <ValidationSpinner state={'FAILURE'} />,
        disabled: true,
      };
    }
  }
};

export const useButtonValidationAnimation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    buttonState: state,
    setButtonState: dispatch,
  };
};

export default useButtonValidationAnimation;
