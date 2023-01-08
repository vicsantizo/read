import { useReducer } from 'react';

const initialState = {
  title: '',
  author: '',
  category: '',
  description: '',
  pages: '',
  isFavorite: false,
  isFinished: false,
};

export type FormState = {
  title: string;
  author: string;
  category: string;
  description: string;
  pages: string | number;
  isFavorite: boolean;
  isFinished: boolean;
};

export enum FormAction {
  UPDATE = 'UPDATE',
  NUMERIC_UPDATE = 'NUMERIC_UPDATE',
  RESET = 'RESET',
}
export type Action = {
  type: FormAction;
  field: string;
  value: string | boolean | number;
};

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
  }
};

export const useSaveBook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    formFields: state,
    setFormField: dispatch,
  };
};

export default useSaveBook;
