import './burger.css';

type BurgerProps = {
  isActive: boolean;
  action: () => void;
};

export const Burger = (props: BurgerProps) => {
  const { isActive, action } = props;

  return (
    <button className="burger" onClick={action}>
      <span className={`burger__bun ${isActive ? 'burger--rotate-full' : ''}`}></span>
      <span className={`burger__meat ${isActive ? 'burger--rotate' : ''}`}></span>
      <span className={`burger__bun ${isActive ? 'burger--hide' : ''}`}></span>
    </button>
  );
};
