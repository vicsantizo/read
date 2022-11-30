import { Navbar } from './Navbar';

type HeaderProps = {
  isSidebarActive: boolean;
  setIsSidebarActive: () => void;
};

export const Header = (props: HeaderProps) => {
  return (
    <header>
      <Navbar {...props} />
    </header>
  );
};

export default Header;
