import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useBooksContext } from '../../../../context/books/useBooksContext';
import { PersistentStorageContext } from '../../../../context/persistentStorage/PersistentStorageContext';
import { useTheme } from '../../../../context/theme/useTheme';
import { IBooksLibraryPersistentStorage } from '../../../../store/IBooksLibraryPersistentStorage';
import { Book } from '../../../booksLibrary/models/book';

type Inputs = {
  date: string;
  fromPage: number;
  toPage: number;
};

type TrackerFormProps = {
  book: Book;
};

export const TrackerForm = ({ book }: TrackerFormProps) => {
  const lastRecord = book.getTrackerLog().getLastRecord();
  let lastPageRead = 1;

  if (lastRecord !== false) {
    lastPageRead = lastRecord.getToPage();
  }

  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      fromPage: lastPageRead,
    },
  });

  const { theme } = useTheme();
  const inputTheme = theme === 'dark' ? 'input--dark' : 'input--light';

  const persistentStorage = useContext(PersistentStorageContext);
  const { addBookLogEntry } = useBooksContext(persistentStorage as IBooksLibraryPersistentStorage);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addBookLogEntry(book.getId(), data.fromPage, data.toPage, new Date(data.date));
    reset();
  };

  return (
    <form className="tracker__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="tracker__form-desc">Enter the date and range of pages you have read</p>
      <div className="tracker__form-inputs">
        <div className="tracker__form-date-wrapper">
          <input
            id="date"
            type="date"
            required
            className={`input ${inputTheme}`}
            {...register('date', { required: 'Please, enter a valid date' })}
          />
        </div>
        <div className="tracker__form-last-row">
          <input
            className={`input ${inputTheme}`}
            id="fromPage"
            {...register('fromPage', { required: 'Invalid page number' })}
            placeholder="from"
            inputMode="numeric"
            type="number"
            min={0}
            autoComplete="off"
            required
          />
          <span className="tracker__form-pages-separator">-</span>
          <input
            className={`input ${inputTheme}`}
            id="toPage"
            {...register('toPage', { required: 'Invalid page number' })}
            placeholder="to"
            required
            inputMode="numeric"
            type="number"
            min={0}
            autoComplete="off"
          />
          <button className="tracker__form-btn btn btn--primary-action">Track</button>
        </div>
      </div>
    </form>
  );
};

export default TrackerForm;
