import { Library } from '../features/booksLibrary/components/library/Library';
import { useBooksLibraryStore } from '../store/useBooksLibraryStore';

export const Home = () => {
  const { books, error, createBook, getBookById } = useBooksLibraryStore();
  return <Library books={books} error={error} createBook={createBook} getBookById={getBookById} />;
};

export default Home;
