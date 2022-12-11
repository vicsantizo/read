import { MutableRefObject } from 'react';
import './css/book.css';
import { cutString } from '../../helper';

export type BookProps = {
  title: string;
  author: string;
  bookId: string;
  booksSelected: MutableRefObject<Record<string, boolean>>;
  editionMode: boolean;
};

export const Book = (props: BookProps) => {
  const { title, author, bookId, editionMode, booksSelected } = props;
  return (
    <div className="book relative">
      <div className="absolute top-0 right-0 mr-2 mt-2 flex items-center gap-2">
        <input
          className={`${
            editionMode ? 'visible' : 'invisible'
          } h-[1.5rem] w-[1.5rem] md:h-[1.25rem] md:w-[1.25rem] z-[3] mr-auto`}
          type={'checkbox'}
          onChange={(e) => {
            booksSelected.current[bookId] = e.target.checked;
          }}
        />
      </div>
      <span className="book__title">{cutString(title, 65)}</span>
      <span className="book__author">{cutString(author, 25)}</span>
    </div>
  );
};

export default Book;
