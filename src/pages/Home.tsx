import { Library } from '../features/booksLibrary/components/library/Library';
import { useBooksLibraryStore } from '../store/useBooksLibraryStore';

export const Home = () => {
  const { books, error, createBook, getBookById } = useBooksLibraryStore();
  return (
    <div className="home container mx-auto">
      <Library books={books} error={error} createBook={createBook} getBookById={getBookById} />
    </div>
  );
};

export default Home;
