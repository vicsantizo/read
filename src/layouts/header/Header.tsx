import { Burger } from '../../components/ui/burger';
import { Logo } from '../../components/ui/logo';
import './header.css';

export type HeaderProps = {
  isSidebarShowing: boolean;
  setIsSidebarShowing: () => void;
};

export const Header = ({ isSidebarShowing, setIsSidebarShowing }: HeaderProps) => {
  return (
    <header className="header">
      <nav className="nav">
        <Burger isActive={isSidebarShowing} action={setIsSidebarShowing} />
        <div className="nav__logo">
          <Logo />
        </div>
      </nav>
    </header>
  );
};

export default Header;
