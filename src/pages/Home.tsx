import { Library } from '../features/booksLibrary/components/library/Library';
import { useBooksLibraryStore } from '../store/useBooksLibraryStore';

export const Home = () => {
  const { books, error, createBook, getBookById, deleteBookById, updateBookById } = useBooksLibraryStore();

  return (
    <div className="home container mx-auto h-full">
      <Library
        books={books}
        error={error}
        createBook={createBook}
        getBookById={getBookById}
        deleteBookById={deleteBookById}
        updateBookById={updateBookById}
      />
    </div>
  );
};

export default Home;
