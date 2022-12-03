import { useState, useReducer, ChangeEvent, MouseEvent, useRef, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useBooksStore } from '../../library/dataStores/useBookStore';
import { Spinner } from './Spinner';

type ButtonTextState = {
  element: string | ReactElement;
};

const initialButtonState: ButtonTextState = {
  element: 'Add',
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

export const BookForm = () => {
  const initialState = { title: '', author: '' };
  const [bookFields, setBookFields] = useState(initialState);
  const titleInput = useRef<HTMLInputElement | null>(null);
  const { createBook } = useBooksStore();

  useEffect(() => {
    titleInput.current?.focus();
  }, []);

  const [buttonText, setButtonText] = useReducer(reducer, initialButtonState);

  function reducer(state: ButtonTextState, action: Action): ButtonTextState {
    switch (action.type) {
      case ActionKind.INPUT: {
        return {
          element: 'Add',
        };
      }
      case ActionKind.LOADING: {
        return {
          element: 'Loading...',
        };
      }
      case ActionKind.FAILURE: {
        return {
          element: <Spinner success={false} />,
        };
      }
      case ActionKind.SUCCESS: {
        return {
          element: <Spinner success={true} />,
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookFields({
      ...bookFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    if (bookFields.title !== '' && bookFields.author !== '') {
      try {
        setButtonText({ type: ActionKind.LOADING });
        await createBook(bookFields.title, bookFields.author);
        setButtonText({ type: ActionKind.SUCCESS });
        setTimeout(() => {
          setButtonText({ type: ActionKind.INPUT });
          setBookFields(initialState);
          titleInput.current?.focus();
        }, 3000);
      } catch {
        setButtonText({ type: ActionKind.FAILURE });
        setTimeout(() => {
          setBookFields(initialState);
          setButtonText({ type: ActionKind.INPUT });
          titleInput.current?.focus();
        }, 3000);
      }
    }
  };

  return (
    <form className="relative flex flex-col mx-auto p-[var(--page-padding)] w-[100%] max-w-[400px] h-[90vh]">
      <h1 className="font-bold text-lg mb-6 mt-8">Add Book</h1>
      <label className="" htmlFor="title">
        Title
      </label>
      <input
        ref={titleInput}
        onChange={handleChange}
        value={bookFields.title}
        className="input input-dark mb-3"
        id="title"
        name="title"
        autoComplete="off"
      />
      <label htmlFor="author">Author</label>
      <input
        onChange={handleChange}
        value={bookFields.author}
        className="input input-dark mb-3"
        id="author"
        name="author"
        autoComplete="off"
      />
      <button
        disabled={false}
        onClick={handleClick}
        className="mt-7 bg-[var(--accept)] text-sm text-white font-semibold py-2 rounded-md mb-3"
      >
        {buttonText.element}
      </button>
      <Link to="/" title="Go back">
        <button className="text-white text-sm py-2 rounded-md w-[100%]">Back</button>
      </Link>
    </form>
  );
};

export default BookForm;
