import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/theme/useTheme';

export const NotFound = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`relative mx-auto flex h-[100vh] w-[100%] max-w-[400px] flex-col items-center justify-center p-[var(--page-padding)] ${
        theme == 'dark' ? 'bg-[#1f1f23]' : 'bg-white'
      }`}
    >
      <div className="mb-4 text-2xl font-bold">Oops!</div>
      <h1 className="mb-4">Sorry, an unexpected error has occurred.</h1>
      <div className="italic text-gray-500">Not Found</div>
      <Link
        to="/"
        title="Go Back"
        className="mt-[2rem] w-[100%] rounded-md bg-gray-500 py-2 px-5 text-center text-sm font-bold hover:opacity-50"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
