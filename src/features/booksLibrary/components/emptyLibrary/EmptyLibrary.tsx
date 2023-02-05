import { Link } from 'react-router-dom';

export const EmptyLibrary = () => {
  return (
    <div className="mt-auto flex h-[80vh] h-full flex-col items-center justify-center gap-4">
      <img
        src="https://raw.githubusercontent.com/vicsantizo/remote/main/images/students-library.png"
        width={250}
        height={197}
        alt=""
      />
      <div className="text-center text-sm">
        <div className="text-base font-bold">You don&apos;t have any books yet</div>
        <div className="text-gray-500">Add a new book that you would like to track</div>
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
