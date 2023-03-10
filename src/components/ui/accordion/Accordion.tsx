import { ReactNode } from 'react';
import { useAccordion } from './useAccordion';
import { ArrowIcon } from '../arrowIcon/';
import { v4 as uuidv4 } from 'uuid';
import './accordion.css';

type AccordionProps = {
  children: ReactNode;
  label: string;
};

export const Accordion = ({ label, children }: AccordionProps) => {
  const { isContentShowing, setIsContentShowing } = useAccordion();
  const controlId = uuidv4();

  const stylingHiddenContent = !isContentShowing ? { display: 'none' } : undefined;

  return (
    <div className="accordion" aria-label={`${label} Accordion`} data-testid="accordion">
      <button
        type="button"
        className="accordion__button"
        onClick={setIsContentShowing}
        aria-expanded={isContentShowing}
        aria-controls={controlId}
      >
        <span className="accordion__text">{label}</span>
        <ArrowIcon isArrowUp={isContentShowing} />
      </button>

      <div
        style={stylingHiddenContent}
        className="accordion__content"
        id={controlId}
        aria-hidden={!isContentShowing}
        data-testid="content"
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
