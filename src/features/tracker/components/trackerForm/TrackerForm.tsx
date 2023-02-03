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
      className={`relative mx-auto flex h-[90vh] w-[100%] max-w-[400px] flex-col`}
    >
      <h1 className="mb-8 mt-8 text-center text-lg font-bold text-gray-500">Reading Tracker</h1>
      <div className="mb-3 flex justify-center gap-5">
        <div className="flex flex-col">
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
          <span className="mt-2 w-full text-center text-sm text-gray-500">{book?.getPages()} pages</span>
        </div>
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <StatCard
          title="Progress"
          content={String(book?.getTracker().calculateCompletion(book.getPages())).concat('%')}
        />
        <StatCard title="Started" content={book?.getTracker().getStartDate()} />
        <StatCard title="Finished" content={book?.getTracker().getCompletionDate(book?.getPages())} />
      </div>
      <div className="mb-10 flex w-[100%] flex-col justify-start border border-r-0 border-l-0 border-gray-700 py-8">
        <h2 className="mb-2 text-sm font-bold">Log Progress</h2>
        <p className="mb-5 text-sm text-gray-500">Enter the date and the range of pages that you have read</p>
        <div className="mb-7 flex items-center justify-between gap-2">
          <div className="flex w-full flex-col">
            <input
              id="date"
              name="date"
              type="date"
              value={formFields.date}
              required
              onChange={(e) => {
                setFormFields({ type: FormAction.UPDATE, field: 'date', value: e.target.value });
              }}
              className={`w-full rounded-md border border-gray-500 px-2 py-1 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
            />
          </div>
          <span className="mx-3 h-full border border-r-0 border-gray-500"></span>
          <div className="flex items-center">
            <div className="min-w-[7ch] max-w-[10ch]">
              <input
                value={formFields.from}
                onChange={(e) => {
                  setFormFields({ type: FormAction.UPDATE, field: 'from', value: e.target.value });
                }}
                required
                placeholder="From"
                inputMode="numeric"
                type="number"
                className={`w-full rounded-md border border-gray-500 px-2 py-1 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
                name="from"
                id="from"
                min="0"
              />
            </div>
            <span className="mx-2 flex items-center text-xl text-gray-500">-</span>
            <div className="min-w-[7ch] max-w-[10ch]">
              <input
                value={formFields.to}
                onChange={(e) => {
                  setFormFields({ type: FormAction.UPDATE, field: 'to', value: e.target.value });
                }}
                required
                inputMode="numeric"
                placeholder="To"
                className={`w-full rounded-md border border-gray-500 px-2 py-1 ${theme == 'dark' && 'bg-[#1f1f23]'}`}
                type="number"
                min="0"
                name="to"
                id="to"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-full">
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
        <h2 className="mb-3 text-center text-sm font-bold">History</h2>
        <LogsTable trackingData={book?.getTracker().getAllRecords().slice(-5)} />
      </div>
      <Link
        to="/"
        title="Go Back"
        className="mt-[2.5rem] mb-8 w-[100%] rounded-md py-2 text-center text-sm hover:opacity-50"
      >
        Back
      </Link>
    </Form>
  );
};

export default TrackerForm;
