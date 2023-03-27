import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../../../../context/books/useBooksContext';
import { PersistentStorageContext } from '../../../../context/persistentStorage/PersistentStorageContext';
import { IBooksLibraryPersistentStorage } from '../../../../store/IBooksLibraryPersistentStorage';
import './saveBookForm.css';

type Inputs = {
  category: string[];
  title: string;
  author: string;
  description: string;
  pages: number;
};

type SaveBookFormProps = {
  title: string;
  description: string;
};

export const SaveBookForm = (props: SaveBookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const persistentStorage = useContext(PersistentStorageContext);
  const { addBook } = useBooksContext(persistentStorage as IBooksLibraryPersistentStorage);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addBook(data);
    reset();
  };

  return (
    <div className="savebook">
      <form className="savebook__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="savebook__title">{props.title}</h1>
        <p className="savebook__description">{props.description}</p>
        <hr className="savebook__separator" />

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
        <button className="btn btn--primary-action">Accept</button>
      </form>
    </div>
  );
};

export default SaveBookForm;