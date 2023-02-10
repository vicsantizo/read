import { useEffect, useRef } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { AcceptButton } from '../../../components/ui/button/';
import { useTheme } from '../../../context/theme/useTheme';
import { useBooksLibraryStore } from '../../../store/useBooksLibraryStore';
import { Book } from '../../booksLibrary/models';
import { FormAction, FormState, useSaveBook } from './useSaveBook';

export type SaveBookProps = {
  title: string;
  initialState: FormState;
  mode: 'create' | 'update';
};

export const SaveBook = ({ title, initialState, mode }: SaveBookProps) => {
  const { formFields, setFormField } = useSaveBook(initialState);
  const { createBook, updateBookById, getBookById } = useBooksLibraryStore();
  const { theme } = useTheme();
  const bookForm = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFormField({ type: FormAction.RESET, field: 'reset', value: 'reset' });
  }, [initialState]);

  return (
    <div className="flex h-full flex-col">
      <Form
        ref={bookForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="relative mx-auto flex h-full w-[100%] max-w-[400px] flex-col md:mt-[4rem]"
      >
        <h1 className="mt-8 text-lg font-semibold">{title}</h1>
        <div className="mb-3 text-sm text-gray-500">Fill the required fields to save the book</div>
        <div className="mb-6 border border-t-0 border-r-0 border-l-0 border-gray-700"></div>
        <label className="mb-1 text-sm" htmlFor="category">
          Genre
        </label>
        <select
          className={`mb-5 rounded-md border border-gray-500 ${theme == 'light' && 'bg-white'} px-1 py-[0.5rem] ${
            theme == 'dark' &&
            'border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
          }`}
          id="category"
          name="category"
          multiple={false}
          value={formFields.category}
          onChange={(e) =>
            setFormField({
              type: FormAction.UPDATE,
              field: e.target.name,
              value: e.target.options[e.target.selectedIndex].value,
            })
          }
        >
          <option value="None">None</option>
          <option value="Programming">Programming</option>
          <option value="Biography">Biography</option>
          <option value="Business">Business</option>
          <option value="Fiction">Fiction</option>
          <option value="Self-help">Self-help</option>
          <option value="Philosophy">Philosophy</option>
        </select>
        <label className="mb-1 text-sm" htmlFor="title">
          Title<span className={`${formFields.title == '' ? 'text-red-500 dark:text-red-300' : 'hidden'}`}> *</span>
        </label>
        <input
          inputMode="text"
          autoComplete="off"
          required
          enterKeyHint="next"
          className={`mb-5 rounded-md border border-gray-500 px-2 py-[0.35rem] ${
            theme == 'dark' &&
            'border-b-1 border-r-0 border-l-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
          }`}
          id="title"
          name="title"
          value={formFields.title}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        />
        <label className="mb-1 text-sm" htmlFor="author">
          Author<span className={`${formFields.author == '' ? 'text-red-500 dark:text-red-300' : 'hidden'}`}> *</span>
        </label>
        <input
          inputMode="text"
          autoComplete="off"
          required
          enterKeyHint="next"
          className={`mb-5 rounded-md border border-gray-500 px-2 py-[0.35rem] ${
            theme == 'dark' &&
            'border-b-1 border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
          }`}
          id="author"
          name="author"
          value={formFields.author}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        />
        <label className="mb-1 text-sm" htmlFor="description">
          Description
        </label>
        <textarea
          autoCapitalize="off"
          placeholder=""
          className={`mb-5 min-h-[5rem] rounded-md border border-gray-500 px-2 py-1 ${
            theme == 'dark' &&
            'border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
          }`}
          id="description"
          name="description"
          maxLength={600}
          cols={30}
          rows={5}
          value={formFields.description}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        ></textarea>
        <div className="flex flex-col items-end">
          <input
            inputMode="numeric"
            autoComplete="off"
            pattern="\d*"
            type="number"
            enterKeyHint="next"
            className={`max-w-[8ch] rounded-md  border border border-gray-500 px-2 py-[0.35rem] ${
              theme == 'dark' &&
              'border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
            }`}
            id="pages"
            name="pages"
            min={0}
            value={formFields.pages}
            onChange={(e) =>
              setFormField({ type: FormAction.NUMERIC_UPDATE, field: e.target.name, value: e.target.value })
            }
          />
          <label className="text-sm text-gray-500" htmlFor="pages">
            pages #
          </label>
        </div>
        <div className="mt-3 flex flex-col py-5">
          <Link to="/" title="Go Back" className="mb-3 w-[100%] rounded-md py-2 text-center text-sm hover:opacity-50">
            Back
          </Link>
          <AcceptButton
            disable={!Boolean(formFields.title && formFields.author)}
            cleanup={() => {
              setFormField({ type: FormAction.WIPE, field: 'none', value: 'none' });
            }}
            execute={() => {
              const id = formFields.id;
              const title = formFields.title;
              const author = formFields.author;
              const description = formFields.description;
              const category = formFields.category;
              const pages = Number(formFields.pages);
              const isFavorite = formFields.isFavorite;

              if (mode === 'create') {
                createBook(title, author, description, category, pages, isFavorite);
              }

              if (mode === 'update') {
                const newBook = new Book(title, author, undefined, description, category, pages, isFavorite);

                getBookById(id)
                  .then((book) => {
                    newBook.setTracker(book!.getTracker());
                    updateBookById(id, newBook);
                    setTimeout(() => {
                      navigate('/');
                    }, 3000);
                  })
                  .catch(() => {
                    throw new Error('Something happened...');
                  });
              }
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default SaveBook;
