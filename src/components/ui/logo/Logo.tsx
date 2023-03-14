import { Link } from 'react-router-dom';
import { LogoIcon } from './LogoIcon';
import './logo.css';

export const Logo = () => {
  return (
    <Link to="/" title="Go to Home page">
      <LogoIcon />
    </Link>
  );
};

export default Logo;
