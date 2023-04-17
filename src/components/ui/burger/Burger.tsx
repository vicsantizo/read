import './burger.css';

type BurgerProps = {
  isActive: boolean;
  action: () => void;
};

export const Burger = (props: BurgerProps) => {
  const { isActive, action } = props;

  const hamburgerIcon = (
    <svg className="burger__icon" width={23} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1zm0 6a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1zm-1 7a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h16z" />
    </svg>
  );

  const closeIcon = (
    <svg className="burger__close" width={23} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" />
    </svg>
  );

  return (
    <button className="burger" onClick={action} title="Show menu">
      {isActive ? closeIcon : hamburgerIcon}
    </button>
  );
};
