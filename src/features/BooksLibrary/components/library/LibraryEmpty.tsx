import { Link } from 'react-router-dom';

export const LibraryEmpty = () => {
  return (
    <div className="library-empty">
      <div className="library-empty__icon">
        <div className="h-[12px] w-[50px] rounded-sm rounded-b-none bg-[var(--primary-500)] md:h-[16px] md:w-[60px]"></div>
        <div className="text-white flex h-[80px] w-[145px] flex-col items-center justify-center rounded-sm rounded-tl-none bg-[var(--primary-500)] text-sm font-bold leading-tight [box-shadow:0_0_2px_hsl(0_0%_0%/.5)] md:h-[100px] md:w-[165px]">
          <span className="">No books</span>
        </div>
      </div>

      <Link to={'/books/new'} className="library-empty__link">
        Add book
      </Link>

      <div className="library-empty__msg">Add a new book to start tracking your progress</div>
    </div>
  );
};

export default LibraryEmpty;
