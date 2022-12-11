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
        <button tabIndex={-1} className="dropdown__button" onClick={handleSetShowContent}>
          <span className="dropdown__text max-w-[16ch] md:max-w-[40ch]">{props.text}</span>
        </button>
        <button className={arrowType} onClick={handleSetShowContent}></button>
      </span>
      {showContent && <div className="dropdown__content">{props.children}</div>}
    </div>
  );
}

export default Dropdown;
