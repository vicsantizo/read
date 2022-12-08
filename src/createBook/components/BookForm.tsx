import { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooksStore } from '../../library/dataStores/useBookStore';
import { useButton } from './hooks/useButton';

export const BookForm = () => {
  const initialState = { title: '', author: '' };
  const [bookFields, setBookFields] = useState(initialState);
  const titleInput = useRef<HTMLInputElement | null>(null);
  const { createBook } = useBooksStore();

  useEffect(() => {
    titleInput.current?.focus();
  }, []);

  const { buttonState, setButtonState, ActionKind } = useButton();

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
        setButtonState({ type: ActionKind.LOADING });
        await createBook(bookFields.title, bookFields.author);
        setButtonState({ type: ActionKind.SUCCESS });
        setTimeout(() => {
          setButtonState({ type: ActionKind.INPUT });
          setBookFields(initialState);
          titleInput.current?.focus();
        }, 3000);
      } catch {
        setButtonState({ type: ActionKind.FAILURE });
        setTimeout(() => {
          setBookFields(initialState);
          setButtonState({ type: ActionKind.INPUT });
          titleInput.current?.focus();
        }, 3000);
      }
    }
  };

  return (
    <form className="relative flex flex-col mx-auto p-[var(--page-padding)] w-[100%] max-w-[400px] h-[90vh]">
      <h1 className="font-bold text-lg mb-6 mt-8">Add Book</h1>
      <label className="text-sm mb-1" htmlFor="title">
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
      <label className="text-sm mb-1" htmlFor="author">
        Author
      </label>
      <input
        onChange={handleChange}
        value={bookFields.author}
        className="input input-dark mb-3"
        id="author"
        name="author"
        autoComplete="off"
      />
      <button
        disabled={buttonState.disabled}
        onClick={handleClick}
        className="mt-7 bg-[var(--accept)] text-sm text-white font-semibold py-2 rounded-md mb-3"
      >
        {buttonState.content}
      </button>
      <Link to="/" title="Go back">
        <button className="text-white text-sm py-2 rounded-md w-[100%]">Back</button>
      </Link>
    </form>
  );
};

export default BookForm;
