import { Link } from 'react-router-dom';
import '../assets/css/errorPage.css';

export const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-page__msg">Oops!</div>
      <h1 className="error-page__title">Sorry, an unexpected error has occurred.</h1>
      <div className="error-page__type">Not Found</div>
      <Link to="/" title="Go to Home Page" className="error-page__link">
        Go Home
      </Link>
    </div>
  );
};

export default Error404;
