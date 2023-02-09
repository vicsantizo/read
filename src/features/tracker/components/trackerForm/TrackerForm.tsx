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
      className={`relative mx-auto flex w-[100%] max-w-[400px] flex-col py-10`}
    >
      <div className="mb-5 flex justify-center gap-5">
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
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <StatCard
          title="Progress"
          content={String(book?.getTracker().calculateCompletion(book.getPages())).concat('%')}
        />
        <StatCard title="Started" content={book?.getTracker().getStartDate()} />
        <StatCard title="Finished" content={book?.getTracker().getCompletionDate(book?.getPages())} />
      </div>

      <div className="mb-5 flex w-full flex-col">
        <h2 className="font-bold">Log Progress</h2>
        <p className="mb-3 text-sm text-gray-500">Enter the date and the range of pages that you have read</p>
        <div className="mb-6 border border-r-0 border-l-0 border-t-0 border-gray-700"></div>

        <div className="flex items-center">
          <div
            className={`${
              theme == 'dark' &&
              'border-b-1 border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
            } "flex w-full rounded-md py-[0.25rem] ${theme == 'light' && 'border border-gray-500 bg-white'}`}
          >
            <input
              id="date"
              name="date"
              type="date"
              value={formFields.date}
              required
              onChange={(e) => {
                setFormFields({ type: FormAction.UPDATE, field: 'date', value: e.target.value });
              }}
              className={`text-md w-full flex-1 ${theme == 'light' && 'bg-white'} px-2 ${
                theme == 'dark' && 'bg-[#343434]'
              }`}
            />
          </div>

          <span className="mx-3 h-[2rem] border border-l-0 border-b-0 border-t-0 border-gray-700"></span>

          <div className="flex items-center">
            <input
              value={formFields.from}
              onChange={(e) => {
                setFormFields({ type: FormAction.UPDATE, field: 'from', value: e.target.value });
              }}
              required
              placeholder="From"
              inputMode="numeric"
              type="number"
              className={`w-full min-w-[7ch] max-w-[10ch] rounded-md border border-gray-500 px-2 py-[0.35rem] ${
                theme == 'dark' &&
                'border-b-1 border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
              }`}
              name="from"
              id="from"
              min="0"
            />

            <span className="mx-2 flex items-center text-xl text-gray-500">-</span>

            <input
              value={formFields.to}
              onChange={(e) => {
                setFormFields({ type: FormAction.UPDATE, field: 'to', value: e.target.value });
              }}
              required
              inputMode="numeric"
              placeholder="To"
              className={`w-full min-w-[7ch] max-w-[10ch] rounded-md border border-gray-500 px-2 py-[0.35rem] ${
                theme == 'dark' &&
                'border-b-1 border-l-0 border-r-0 border-t-0 border-gray-700 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
              }`}
              type="number"
              min="0"
              name="to"
              id="to"
            />
          </div>
        </div>
      </div>

      <div className="mb-10 w-full">
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

      <div className="form__table mb-7 h-full">
        <LogsTable trackingData={book?.getTracker().getAllRecords().slice(-5)} />
      </div>

      <Link to="/" title="Go Back" className="w-[100%] rounded-md py-5 text-center text-sm hover:opacity-50">
        Back
      </Link>
    </Form>
  );
};

export default TrackerForm;
