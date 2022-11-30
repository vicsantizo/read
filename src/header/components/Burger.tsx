import React from 'react';
import './css/burger.css';

type BurgerProps = {
  isSidebarActive: boolean;
  setIsSidebarActive: () => void;
};

export const Burger = (props: BurgerProps) => {
  const { isSidebarActive, setIsSidebarActive } = props;
  return (
    <button className="burger" onClick={setIsSidebarActive}>
      <span className={`burger__bun ${isSidebarActive && 'burger--rotate-full'}`}></span>
      <span className={`burger__meat ${isSidebarActive && 'burger--rotate'}`}></span>
      <span className={`burger__bun ${isSidebarActive && 'burger--hide'}`}></span>
    </button>
  );
};

export default Burger;
