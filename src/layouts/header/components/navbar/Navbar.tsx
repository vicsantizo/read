import { Burger } from '../../../../components/ui/burger';
import { Logo } from '../logo';
import './navbar.css';

type NavbarProps = {
  isSidebarActive: boolean;
  setIsSidebarActive: () => void;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav className="nav">
      <Burger {...props} />
      <div className="nav__logo">
        <Logo />
      </div>
    </nav>
  );
};

export default Navbar;
