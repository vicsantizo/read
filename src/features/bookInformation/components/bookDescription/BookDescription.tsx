import './bookDescription.css';

type BookDescriptionProps = {
  description: string;
};

export const BookDescription = ({ description }: BookDescriptionProps) => {
  return (
    <div className="book__description">
      <h2 className="book__description-title">Description</h2>
      <p className="book__description-text book__description-text--dark">
        {description || 'No description available.'}
      </p>
    </div>
  );
};

export default BookDescription;
