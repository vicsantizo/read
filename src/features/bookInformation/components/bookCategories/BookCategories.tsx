import './bookCategories.css';

type BookCategoriesProps = {
  categories: string[];
};

export const BookCategories = ({ categories }: BookCategoriesProps) => {
  return (
    <ul className="book__categories">
      {categories.map((category) => (
        <li key={category} className="book__category">
          {category}
        </li>
      ))}
    </ul>
  );
};

export default BookCategories;
