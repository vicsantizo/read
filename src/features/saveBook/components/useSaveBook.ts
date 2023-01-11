import { useReducer } from 'react';

export type FormState = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: string | number;
  isFavorite: boolean;
  isFinished: boolean;
};

const emptyFields = {
  id: '',
  title: '',
  author: '',
  category: '',
  description: '',
  pages: '',
  isFavorite: false,
  isFinished: false,
};

export enum FormAction {
  UPDATE = 'UPDATE',
  NUMERIC_UPDATE = 'NUMERIC_UPDATE',
  RESET = 'RESET',
  WIPE = 'WIPE',
}
export type Action = {
  type: FormAction;
  field: string;
  value: string | boolean | number;
};

export const useSaveBook = (initialState: FormState) => {
  const reducer = (state: FormState, action: Action) => {
    switch (action.type) {
      case FormAction.UPDATE: {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      case FormAction.NUMERIC_UPDATE: {
        let value: number | string = '';
        if (Number.isNaN(parseInt(action.value as string))) {
          value = '';
        } else {
          value = Number(action.value);
        }
        return {
          ...state,
          [action.field]: value,
        };
      }

      case FormAction.RESET: {
        return initialState;
      }

      case FormAction.WIPE: {
        return emptyFields;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    formFields: state,
    setFormField: dispatch,
  };
};

export default useSaveBook;
