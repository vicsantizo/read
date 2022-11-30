import './css/book.css';

type BookProps = {
  title: string;
  author: string;
};

export const Book = (props: BookProps) => {
  const { title, author } = props;
  return (
    <div className="book">
      <span className="book__title">{title}</span>
      <span className="book__author">{author}</span>
    </div>
  );
};

export default Book;
