import { cutString } from '../../utils/utils';
import { BookProgress } from '../bookProgress';
import './book.css';

export type BookProps = {
  title: string;
  author: string;
  progress: number;
};

export const Book = (props: BookProps) => {
  const { title, author, progress } = props;
  return (
    <button className="book relative">
      <span className="book__title">{cutString(title, 65)}</span>
      <span className="book__author">{cutString(author, 25)}</span>
      <BookProgress progress={progress} />
    </button>
  );
};

export default Book;
