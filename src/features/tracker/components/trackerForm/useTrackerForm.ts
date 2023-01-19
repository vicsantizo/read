import { useReducer } from 'react';

export type FormState = {
  date: string;
  from: string | number;
  to: string | number;
};

export enum FormAction {
  UPDATE = 'UPDATE',
  WIPE = 'WIPE',
}

export type Action = {
  type: FormAction;
  field: string;
  value: string | boolean | number;
};

const emptyFields = {
  date: new Date().toISOString().slice(0, 10),
  from: '',
  to: '',
};

function reducer(state: FormState, action: Action) {
  switch (action.type) {
    case FormAction.UPDATE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case FormAction.WIPE: {
      return emptyFields;
    }
  }
}

export const useTrackerForm = () => {
  const [state, dispatch] = useReducer(reducer, emptyFields);
  return {
    formFields: state,
    setFormFields: dispatch,
  };
};

export default useTrackerForm;
