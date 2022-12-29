import { useRef, Dispatch, SetStateAction, useEffect } from 'react';
import './css/book.css';
import { cutString } from '../../helper';

export type BookProps = {
  title: string;
  author: string;
  bookId: string;
  setSelection: Dispatch<SetStateAction<Map<string, boolean>>>;
  selection: Map<string, boolean>;
};

export const Book = (props: BookProps) => {
  const { title, author, bookId, setSelection, selection } = props;
  const bookButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selection.get(bookId)) {
      bookButton.current?.classList.add('border');
    }
  }, []);

  return (
    <button
      ref={bookButton}
      className="book relative"
      onClick={() => {
        bookButton.current?.classList.toggle('border');
        setSelection((p) => {
          return new Map(p).set(bookId, !p.get(bookId));
        });
      }}
    >
      <span className="book__title">{cutString(title, 65)}</span>
      <span className="book__author">{cutString(author, 25)}</span>
      {/* <div className="absolute bg-[#707070] h-[3px] w-[100%] bottom-0"> */}
      {/* Change w-[] class with book progress */}
      {/* <div className="bg-[#31E000] h-[100%] w-[22%]"></div> */}
      {/* </div> */}
    </button>
  );
};

export default Book;
