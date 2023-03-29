import '../assets/css/bookDetailsPage.css';
import { BookInformation } from '../features/bookInformation';

export const BookDetails = () => {
  return (
    <div className="book-details-page">
      <BookInformation />
    </div>
  );
};

export default BookDetails;
