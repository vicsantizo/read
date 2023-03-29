import { useTheme } from '../../../../context/theme/useTheme';
import './bookDescription.css';

type BookDescriptionProps = {
  description: string;
};

export const BookDescription = ({ description }: BookDescriptionProps) => {
  const { theme } = useTheme();
  const descriptionTextTheme = theme === 'dark' ? 'book__description-text--dark' : 'book__description-text--light';

  return (
    <div className="book__description">
      <h2 className="book__description-title">Description</h2>
      <p className={`book__description-text ${descriptionTextTheme}`}>{description || 'No description available.'}</p>
    </div>
  );
};

export default BookDescription;
