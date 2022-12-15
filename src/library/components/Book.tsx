import { MutableRefObject, useRef } from 'react';
import './css/book.css';
import { cutString } from '../../helper';

export type BookProps = {
  title: string;
  author: string;
  bookId: string;
  booksSelected: Record<string, boolean>;
};

export const Book = (props: BookProps) => {
  const { title, author, bookId, booksSelected } = props;
  const bookButton = useRef<HTMLButtonElement | null>(null);
  return (
    <button
      ref={bookButton}
      className="book relative"
      onClick={(e) => {
        bookButton.current?.classList.toggle('border');
        booksSelected[bookId] = !booksSelected[bookId];
      }}
    >
      <span className="book__title">{cutString(title, 65)}</span>
      <span className="book__author">{cutString(author, 25)}</span>
    </button>
  );
};

export default Book;
