import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GreekLibraryIcon } from '../../../../components/ui/greekLibraryIcon';
import { Modal } from '../../../../components/ui/modal';
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
  const [showInfo, setShowInfo] = useState(false);
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
          <GreekLibraryIcon className="tracker__form-img tracker__form-img--dark" />
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
        <button
          className="tracker__form-info-btn"
          type="button"
          onClick={() => setShowInfo(true)}
          title="Show information"
        >
          <svg className="tracker__form-info" width={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </button>

        <button className="tracker__form-btn btn btn--primary-action">Track</button>
      </div>

      {showInfo && (
        <Modal
          onClose={() => setShowInfo(false)}
          title="Book Progress"
          text="The book progress is calculated by getting the last tracked entry and the total number of pages"
        />
      )}
    </form>
  );
};

export default TrackerForm;
