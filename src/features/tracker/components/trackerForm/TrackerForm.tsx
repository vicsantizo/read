import { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { AcceptButton } from '../../../../components/ui/button';
import { useTheme } from '../../../../context/theme/useTheme';
import { useBooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { Book } from '../../../booksLibrary/components/book';
import { Book as BookType } from '../../../booksLibrary/models';
import { useTrackerForm, FormAction } from './useTrackerForm';
import { StatCard } from '../statCard';
import { LogsTable } from '../logsTable';

export type TrackerFormProps = {
  bookData: BookType;
};

export const TrackerForm = ({ bookData }: TrackerFormProps) => {
  const [book, setBook] = useState(bookData); // initialized with undefined prop
  const { theme } = useTheme();
  const { formFields, setFormFields } = useTrackerForm();
  const { trackBookById, getBookById } = useBooksLibraryStore();

  // Due to undefined prop, useEffect is used to get the initialized prop in the state
  useEffect(() => {
    if (!book?.getTracker().isEmpty()) {
      setFormFields({
        type: FormAction.UPDATE,
        field: 'from',
        value: bookData?.getTracker()?.getLastRecord()?.toPage || '',
      });
    }
    setBook(bookData);
  }, [bookData]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`relative flex flex-col mx-auto w-[100%] max-w-[400px] h-[90vh]`}
    >
      <h1 className="font-bold mb-8 mt-8 text-center text-gray-500 text-lg">Reading Tracker</h1>
      <div className="flex gap-5 mb-8 justify-center">
        <div className="flex">
          {/* Verifying data has been set */}
          {book && (
            <Book
              disabled={true}
              id={book.getIdentifier()}
              title={book.getTitle()}
              author={book.getAuthor()}
              progress={book.getTracker().calculateCompletion(book.getPages())}
              booksSelection={new Map<string, boolean>()}
              setBooksSelection={(id: string) => id}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        <StatCard
          title="Progress"
          content={String(book?.getTracker().calculateCompletion(book.getPages())).concat('%')}
        />
        <StatCard title="Started" content={book?.getTracker().getStartDate()} />
        <StatCard title="Finished" content={book?.getTracker().getCompletionDate(book?.getPages())} />
      </div>
      <div className="flex flex-col w-[100%] justify-start mb-5">
        <div className="flex gap-2 mb-5 items-center">
          <span className="text-gray-500">{book?.getPages()}</span>
          <span className="mx-2 border border-gray-500 border-l-0 h-full"></span>
          <input
            value={formFields.from}
            onChange={(e) => {
              setFormFields({ type: FormAction.UPDATE, field: 'from', value: e.target.value });
            }}
            required
            placeholder="From"
            inputMode="numeric"
            type="number"
            className={`w-full px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
            name="from"
            id="from"
          />
          <span className="flex items-center text-gray-400 text-xl">-</span>
          <input
            value={formFields.to}
            onChange={(e) => {
              setFormFields({ type: FormAction.UPDATE, field: 'to', value: e.target.value });
            }}
            required
            inputMode="numeric"
            placeholder="To"
            className={`w-full px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
            type="number"
            name="to"
            id="to"
          />
        </div>
        <div className="flex mb-5 gap-3">
          <input
            id="date"
            name="date"
            type="date"
            value={formFields.date}
            required
            onChange={(e) => {
              setFormFields({ type: FormAction.UPDATE, field: 'date', value: e.target.value });
            }}
            style={{ flexGrow: 1 }}
            className={`px-2 py-1 rounded-md border border-gray-500 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
          />
          <div className="w-[35%]">
            <AcceptButton
              cleanup={() => {
                setFormFields({ type: FormAction.WIPE, field: '', value: '' });
              }}
              disable={!(formFields.from && formFields.to)}
              execute={() => {
                trackBookById(book.getIdentifier(), {
                  date: formFields.date,
                  fromPage: Number(formFields.from),
                  toPage: Number(formFields.to),
                })
                  .then(() => {
                    getBookById(book.getIdentifier()).then((theBook) => {
                      setTimeout(() => {
                        setBook(theBook!);
                      }, 3000);
                    });
                  })
                  .catch(() => {
                    throw new Error("Couldn't log the session");
                  });
              }}
            />
          </div>
        </div>
      </div>
      <div className="form__table h-full">
        <LogsTable trackingData={book?.getTracker().getAllRecords().slice(-5)} />
      </div>
      <Link
        to="/"
        title="Go Back"
        className="mt-[2.5rem] text-sm text-center py-2 hover:opacity-50 rounded-md w-[100%] mb-8"
      >
        Back
      </Link>
    </Form>
  );
};

export default TrackerForm;
