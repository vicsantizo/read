import { MutableRefObject } from 'react';
import './css/book.css';

type BookProps = {
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
          } h-[1.5rem] w-[1.5rem] md:h-[1.25rem] md:w-[1.25rem] z-[1] mr-auto`}
          type={'checkbox'}
          onChange={(e) => {
            booksSelected.current[bookId] = e.target.checked;
          }}
        />
      </div>
      <span className="book__title">{title}</span>
      <span className="book__author">{author}</span>
    </div>
  );
};

export default Book;
