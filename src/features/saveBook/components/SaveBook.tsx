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
  const { createBook, updateBookById } = useBooksLibraryStore();
  const { theme } = useTheme();
  const bookForm = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFormField({ type: FormAction.RESET, field: 'reset', value: 'reset' });
  }, [initialState]);

  return (
    <>
      <Form
        ref={bookForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="relative flex flex-col mx-auto w-[100%] max-w-[400px] h-[90vh]"
      >
        <h1 className="font-semibold text-lg mb-6 mt-8">{title}</h1>
        <label className="mb-1 text-sm" htmlFor="title">
          Title *
        </label>
        <input
          inputMode="text"
          autoComplete="off"
          required
          className={`mb-3 px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
          id="title"
          name="title"
          value={formFields.title}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        />

        <label className="mb-1 text-sm" htmlFor="author">
          Author *
        </label>
        <input
          inputMode="text"
          autoComplete="off"
          required
          className={`mb-3 px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
          id="author"
          name="author"
          value={formFields.author}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        />

        <label className="mb-1 text-sm" htmlFor="category">
          Category
        </label>
        <select
          className={`mb-3 px-1 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
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

        <label className="mb-1 text-sm" htmlFor="description">
          Description
        </label>
        <textarea
          autoCapitalize="off"
          placeholder="Type a brief description of the book..."
          className={`mb-3 px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
          id="description"
          name="description"
          maxLength={600}
          cols={30}
          rows={5}
          value={formFields.description}
          onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.value })}
        ></textarea>

        <label className="mb-1 text-sm" htmlFor="pages">
          Pages
        </label>
        <input
          inputMode="numeric"
          autoComplete="off"
          pattern="\d*"
          type="number"
          className={`mb-3 px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
          id="pages"
          name="pages"
          min={0}
          value={formFields.pages}
          onChange={(e) =>
            setFormField({ type: FormAction.NUMERIC_UPDATE, field: e.target.name, value: e.target.value })
          }
        />

        <div className="flex items-center gap-2 mb-3 mt-3">
          <input
            checked={formFields.isFavorite}
            onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.checked })}
            className={`h-[1.25rem] w-[1.25rem] ${theme == 'dark' && 'checkbox-bg-dark'}`}
            type="checkbox"
            id="isFavorite"
            name="isFavorite"
          />
          <label className="text-sm" htmlFor="isFavorite">
            Mark as favorite
          </label>
        </div>

        <div className="flex items-center gap-2 mb-10">
          <input
            checked={formFields.isFinished}
            onChange={(e) => setFormField({ type: FormAction.UPDATE, field: e.target.name, value: e.target.checked })}
            className={`h-[1.25rem] w-[1.25rem] ${theme == 'dark' && 'checkbox-bg-dark'}`}
            type="checkbox"
            id="isFinished"
            name="isFinished"
          />
          <label className="text-sm " htmlFor="isFinished">
            Mark as finished
          </label>
        </div>

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
            const pages = formFields.pages as number;
            const isFavorite = formFields.isFavorite;
            const isFinished = formFields.isFinished;

            if (mode === 'create') {
              createBook(title, author, description, category, pages, isFavorite, isFinished);
            }

            if (mode === 'update') {
              const newBook = new Book(title, author, undefined, description, category, pages, isFavorite, isFinished);
              updateBookById(id, newBook);
              setTimeout(() => {
                navigate('/');
              }, 3000);
            }
          }}
        />

        <Link
          to="/"
          title="Go Back"
          className="mt-3 text-sm text-center py-2 hover:opacity-50 rounded-md w-[100%] mb-7"
        >
          Back
        </Link>
      </Form>
    </>
  );
};

export default SaveBook;
