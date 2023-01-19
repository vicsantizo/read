import { ReactNode } from 'react';
import { useDropdown } from './useDropdown';
import './dropdown.css';

type DropdownProps = {
  children: ReactNode;
  text: string;
};

export function Dropdown(props: DropdownProps) {
  const { isActive, toggleContent } = useDropdown();
  const arrowType = isActive ? 'dropdown__arrow arrow--up' : 'dropdown__arrow arrow--down';
  return (
    <div className="dropdown">
      <span className="dropdown__push">
        <button tabIndex={-1} className="dropdown__button" onClick={toggleContent}>
          <span className="dropdown__text max-w-[16ch] md:max-w-[40ch]">{props.text}</span>
        </button>
        <button className={arrowType} onClick={toggleContent}></button>
      </span>
      {isActive && <div className="dropdown__content">{props.children}</div>}
    </div>
  );
}

export default Dropdown;
