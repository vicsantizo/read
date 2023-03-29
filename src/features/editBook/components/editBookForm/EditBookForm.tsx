import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Book as BookType } from '../../../booksLibrary/models/book';
import { useBooksContext } from '../../../../context/books/useBooksContext';
import { PersistentStorageContext } from '../../../../context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from '../../../../store/IBooksLibraryPersistentStorage';
import './editBookForm.css';

type Inputs = {
  category: string[];
  title: string;
  author: string;
  description: string;
  pages: number;
};

export const EditBookForm = () => {
  const book = useLoaderData();
  if (!(book instanceof BookType)) throw new Error("Book doesn't exist");
  const id = book.getId();
  const categories = book.getCategory();
  const title = book.getTitle();
  const author = book.getAuthor();
  const description = book.getDescription();
  const pages = book.getPages();
  const isFavorite = book.getIsFavorite();
  const trackerLog = book.getTrackerLog();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category: categories,
      title: title,
      author: author,
      description: description,
      pages: pages,
    },
  });

  const persistentStorage = useContext(PersistentStorageContext);
  const { updateBook } = useBooksContext(persistentStorage as IBooksLibraryPersistentStorage);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateBook(id, new BookType({ ...data, isFavorite, trackerLog }));
    navigate('/');
  };

  return (
    <div className="editbook">
      <form className="editbook__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="editbook__title">Edit book</h1>
        <p className="editbook__description">Update the information and click &ldquo;update&rdquo; to save changes</p>
        <hr className="editbook__separator" />

        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          className="input input--dark"
          id="title"
          {...register('title', { required: 'Please, enter a valid title' })}
        />
        {errors.title && (
          <p className="form__message form__message--error" role="alert">
            {errors.title.message}
          </p>
        )}

        <label className="label" htmlFor="author">
          Author
        </label>
        <input className="input input--dark" id="author" {...register('author')} />

        <label className="label" htmlFor="category">
          Genre
        </label>
        <select multiple className="input input--dark" id="category" {...register('category')}>
          <option value="bibliography">Bibliography</option>
          <option value="fiction">Fiction</option>
          <option value="philosophy">Philosophy</option>
          <option value="programming">Programming</option>
          <option value="self-help">Self-help</option>
          <option value="science">Science</option>
          <option value="space">Space</option>
        </select>

        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea
          className="input input--dark"
          id="description"
          cols={30}
          rows={5}
          maxLength={600}
          {...register('description')}
        ></textarea>

        <label className="label" htmlFor="pages">
          Pages
        </label>
        <input
          className="input input--dark"
          type="number"
          inputMode="numeric"
          id="pages"
          min={0}
          {...register('pages')}
          autoComplete="off"
        />
        <Link to="/" title="Go to home page" className="btn btn--simple">
          Back
        </Link>
        <button className="btn btn--primary-action">Update</button>
      </form>
    </div>
  );
};

export default EditBookForm;
