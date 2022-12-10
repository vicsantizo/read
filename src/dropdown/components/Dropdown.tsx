import { ReactNode } from 'react';
import { useDropdown } from '../hooks/useDropdown';
import './css/dropdown.css';

type DropdownProps = {
  children: ReactNode;
  text: string;
};

export function Dropdown(props: DropdownProps) {
  const { showContent, handleSetShowContent } = useDropdown();
  const arrowType = showContent ? 'dropdown__arrow arrow--up' : 'dropdown__arrow arrow--down';
  return (
    <div className="dropdown">
      <span className="dropdown__push">
        <button className="dropdown__button" onClick={handleSetShowContent}>
          <span className="dropdown__text">{props.text}</span>
        </button>
        <span role="presentation" className={arrowType} onClick={handleSetShowContent}></span>
      </span>
      {showContent && <div className="dropdown__content">{props.children}</div>}
    </div>
  );
}

export default Dropdown;
