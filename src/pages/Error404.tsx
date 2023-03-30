import { Link, ScrollRestoration } from 'react-router-dom';
import errorImg from '../assets/img/library-error.png';
import '../assets/css/errorPage.css';

export const Error404 = () => {
  return (
    <div className="error-page">
      <ScrollRestoration />
      <div className="error-page__img-wrapper">
        <img className="error-page__img" src={errorImg} alt="" height={300} width={300} />
      </div>

      <div className="error-page__content-wrapper">
        <h1 className="error-page__title">404</h1>
        <h2 className="error-page__msg">Something went wrong!</h2>
        <p className="error-page__desc">
          Sorry, an unexpected error has occurred. The page you&apos;re looking for does not exist or it might have been
          removed
        </p>

        <Link to="/" title="Go to Home Page" className="error-page__link">
          <svg width={20} className="error-page__link-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h48v48H0z" />
            <path d="M19.7 6a.9.9 0 0 0-.8.4L2.4 23.1a1.5 1.5 0 0 0 0 2l16.5 16.5a.9.9 0 0 0 .8.4 1.2 1.2 0 0 0 1.1-1.3V31c15.7.7 21.1 3.8 23.5 9.2.4.8.8 1.1 1.1 1.1s.6-.4.6-1c-.2-10.5-10-20.9-25.2-22.4V7.3A1.2 1.2 0 0 0 19.7 6Z" />
          </svg>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
