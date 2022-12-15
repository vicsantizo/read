import { BookProps } from './Book';
import { Dropdown } from '../../dropdown';
import { cutString } from '../../helper';
import EditButton from './EditButton';
import { Book } from '../models';

type Book2Props = {
  description: string;
  category: string;
  pages: number;
  isFavorite: boolean;
  isFinished: boolean;
  removeBook: (ids: Record<string, boolean>) => Promise<void>;
  booksSelected: Record<string, boolean>;
  getBookById: (id: string) => Promise<Book | undefined>;
} & BookProps;

export const Book2 = (props: Book2Props) => {
  const {
    title,
    author,
    description,
    category,
    pages,
    isFavorite,
    isFinished,
    bookId,
    removeBook,
    booksSelected,
    getBookById,
  } = props;
  return (
    <div className="w-[100%] border border-[#5B5B5B] rounded px-[1rem] py-3 font-bold">
      <div className="flex items-center justify-between">
        <span className="text-sm font-normal">{cutString(author, 25)}</span>
        <div className="flex gap-2 items-center">
          <input
            onChange={(e) => {
              booksSelected[bookId] = e.target.checked;
            }}
            className="h-[1.5rem] w-[1.5rem] checkbox-bg-dark"
            type="checkbox"
          />
          <EditButton
            defaultView={true}
            booksSelected={{ [bookId]: true }}
            getBookById={getBookById}
            alternativeIcon={true}
          />
          <button
            onClick={() => {
              removeBook({ [bookId]: true });
            }}
            className="h-[1.5rem] w-[1.5rem] bg-[var(--danger)] text-white text-center flex items-center justify-center hover:opacity-50 rounded"
          >
            x
          </button>
        </div>
      </div>
      <div className="mt-1">
        <Dropdown text={cutString(title, 65)}>
          <div
            style={{
              marginLeft: '-1rem',
            }}
            className="font-normal"
          >
            <p className="max-w-[55ch] max-h-[7rem] overflow-y-scroll mb-2">{description}</p>
            <ul className="flex flex-col gap-1">
              <li className="flex justify-between w-[25ch]">
                <span className="font-semibold">Category: </span>
                {category}
              </li>
              <li className="flex justify-between w-[25ch]">
                <span className="font-semibold">Pages: </span>
                {pages}
              </li>
              <li className="flex justify-between w-[25ch]">
                <span className="font-semibold">Favorite: </span>
                {isFavorite ? 'Yes' : 'No'}
              </li>
              <li className="flex justify-between w-[25ch]">
                <span className="font-semibold">Finished: </span>
                {isFinished ? 'Yes' : 'No'}
              </li>
            </ul>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Book2;
