import { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooksStore } from '../../library/dataStores/useBookStore';
import { useButton } from './hooks/useButton';

export const BookForm = () => {
  const initialState = {
    title: '',
    author: '',
    category: 'None',
    description: '',
    pages: 0,
    isFavorite: false,
    isFinished: false,
  };
  const [bookFields, setBookFields] = useState(initialState);
  const titleInput = useRef<HTMLInputElement | null>(null);
  const { createBook } = useBooksStore();

  useEffect(() => {
    titleInput.current?.focus();
  }, []);

  const { buttonState, setButtonState, ActionKind } = useButton();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookFields({
      ...bookFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBookFields({
      ...bookFields,
      [e.target.name]: e.target.options[e.target.selectedIndex].value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookFields({
      ...bookFields,
      [e.target.name]: e.target.checked,
    });
  };

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    if (bookFields.title !== '' && bookFields.author !== '') {
      try {
        setButtonState({ type: ActionKind.LOADING });
        await createBook(
          bookFields.title,
          bookFields.author,
          bookFields.description,
          bookFields.category,
          bookFields.pages,
          bookFields.isFavorite,
          bookFields.isFinished,
        );
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
        Title *
      </label>
      <input
        ref={titleInput}
        onChange={handleChange}
        value={bookFields.title}
        className="input input-dark mb-3 rounded-md"
        id="title"
        name="title"
        autoComplete="off"
      />
      <label className="text-sm mb-1" htmlFor="author">
        Author *
      </label>
      <input
        onChange={handleChange}
        value={bookFields.author}
        className="input input-dark mb-3 rounded-md"
        id="author"
        name="author"
        autoComplete="off"
      />
      <label className="text-sm mb-1" htmlFor="category">
        Category
      </label>
      <select
        onChange={handleSelectChange}
        defaultValue={'None'}
        name="category"
        id="category"
        multiple={false}
        className="input-dark rounded-md mb-3 py-2 px-1"
      >
        <option value="None">None</option>
        <option value="Programming">Programming</option>
        <option value="Biography">Biography</option>
        <option value="Business">Business</option>
        <option value="Fiction">Fiction</option>
        <option value="Self-help">Self-help</option>
        <option value="Philosophy">Philosophy</option>
      </select>
      <label className="text-sm mb-1" htmlFor="description">
        Description
      </label>
      <textarea
        maxLength={600}
        autoComplete="off"
        placeholder="Type a brief description of the book..."
        className="input input-dark rounded-md mb-3 resize-y min-h-[4.5rem]"
        name="description"
        id="description"
        cols={30}
        rows={5}
        value={bookFields.description}
        onChange={handleChange}
      ></textarea>
      <label className="text-sm mb-1" htmlFor="pages">
        Pages
      </label>
      <input
        inputMode="numeric"
        pattern="\d*"
        type="number"
        min={1}
        className="input input-dark mb-3 rounded-md"
        id="pages"
        name="pages"
        autoComplete="off"
        value={bookFields.pages}
        onChange={handleChange}
      />
      <div className="flex items-center gap-2 mb-3 mt-3">
        <input
          className="checkbox-bg-dark border border-gray-500 outline-none h-[1.5rem] w-[1.5rem] md:h-[1.25rem] md:w-[1.25rem] focus:outline-[#3d65af]"
          type="checkbox"
          id="isFavorite"
          name="isFavorite"
          checked={bookFields.isFavorite}
          onChange={handleCheckboxChange}
        />
        <label className="text-sm" htmlFor="isFavorite">
          Mark as favorite
        </label>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <input
          className="checkbox-bg-dark border border-gray-500 outline-none h-[1.5rem] w-[1.5rem] md:h-[1.25rem] md:w-[1.25rem] focus:outline-[#3d65af]"
          type="checkbox"
          id="isFinished"
          name="isFinished"
          checked={bookFields.isFinished}
          onChange={handleCheckboxChange}
        />
        <label className="text-sm" htmlFor="isFinished">
          Mark as finished
        </label>
      </div>
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
