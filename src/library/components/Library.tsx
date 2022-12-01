import { useBooksStore } from '../dataStores/useBookStore';
import { Book } from './Book';
import EditButton from './EditButton';
import MenuButton from './MenuButton';
import AddButton from './AddButton';
import Search from './Search';

export const Library = () => {
  const { data, error, createBook } = useBooksStore();
  return (
    <div className="library">
      <h1 className="library__title font-bold text-[1.25rem] text-center mb-4 mt-5 ">My Library</h1>
      <div className="library__filter flex justify-center align-center mt-5 mb-5">
        <Search />
      </div>
      <div className="library__actions flex gap-3 justify-center mb-6 items-center">
        <MenuButton />
        <EditButton />
        <AddButton />
      </div>
      <div className="library__body">
        <div className="library__books flex gap-3 flex-wrap justify-center">
          {data.map((book) => (
            <Book key={book.getIdentifier()} title={book.getTitle()} author={book.getAuthor()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
