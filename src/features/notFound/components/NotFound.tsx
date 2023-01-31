import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/theme/useTheme';

export const NotFound = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`p-[var(--page-padding)] relative flex flex-col mx-auto w-[100%] max-w-[400px] items-center justify-center h-[100vh] ${
        theme == 'dark' ? 'bg-[#1f1f23]' : 'bg-white'
      }`}
    >
      <div className="font-bold text-2xl mb-4">Oops!</div>
      <h1 className="mb-4">Sorry, an unexpected error has occurred.</h1>
      <div className="italic text-gray-500">Not Found</div>
      <Link
        to="/"
        title="Go Back"
        className="mt-[2rem] font-bold text-sm text-center py-2 px-5 hover:opacity-50 rounded-md w-[100%] bg-gray-500"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
