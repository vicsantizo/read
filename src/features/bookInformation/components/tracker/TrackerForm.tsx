import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GreekLibraryIcon } from '../../../../components/ui/greekLibraryIcon';
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
  const btnWrapperTheme = theme === 'dark' ? 'tracker__form-btn-wrapper--dark' : 'tracker__form-btn-wrapper--light';

  const persistentStorage = useContext(PersistentStorageContext);
  const { addBookLogEntry } = useBooksContext(persistentStorage as IBooksLibraryPersistentStorage);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addBookLogEntry(book.getId(), data.fromPage, data.toPage, new Date(data.date));
    reset();
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="tracker__form">
        <div className="tracker__form-img-wrapper">
          <GreekLibraryIcon width={150} className="tracker__form-img tracker__form-img--dark" />
        </div>

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
        </div>
      </div>
      <div className={`tracker__form-btn-wrapper ${btnWrapperTheme}`}>
        <button className="tracker__form-btn btn btn--primary-action2">Track</button>
      </div>
    </form>
  );
};

export default TrackerForm;
