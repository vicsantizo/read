import { SaveBookForm } from '../features/saveBook';

export const AddBook = () => {
  const title = 'Add Book';
  const description = 'Fill the required fields to create a new book';

  return <SaveBookForm title={title} description={description} />;
};

export default AddBook;
