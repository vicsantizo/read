import { Link } from 'react-router-dom';

export const EmptyLibrary = () => {
  return (
    <div className="mt-auto flex h-full flex-col items-center justify-center gap-4">
      <div className="mb-1">
        <div className="h-[12px] w-[50px] rounded-sm rounded-b-none bg-[var(--primary-500)] md:h-[16px] md:w-[60px]"></div>
        <div className="flex h-[80px] w-[120px] flex-col items-center justify-center rounded-sm rounded-tl-none bg-[var(--primary-500)] text-sm italic leading-tight text-gray-300 [box-shadow:0_0_5px_hsl(0_0%_0%/.7)] md:h-[100px] md:w-[165px]">
          books
        </div>
      </div>

      <div className="text-center text-sm">
        <div className="text-base font-bold text-gray-400">Empty Book Library</div>
        <div className="text-gray-500">Add a book to track your progress</div>
      </div>
      <div className="w-[120px] rounded-md bg-[var(--success-500)] py-2 pl-2 pr-3 hover:opacity-50">
        <Link to={'/books/create'} className="flex items-center text-center text-sm font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-auto fill-white" width={20}>
            <path d="M298.7 213.3V0h-85.4v213.3H0v85.4h213.3V512h85.4V298.7H512v-85.4z" />
          </svg>
          <span className="mr-auto w-full text-white">Add book</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyLibrary;
