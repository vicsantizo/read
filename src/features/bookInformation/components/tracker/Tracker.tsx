import { Accordion } from '../../../../components/ui/accordion';
import { TrackerForm } from './TrackerForm';
import { useEffect, useRef } from 'react';
import { useTheme } from '../../../../context/theme/useTheme';
import { Book } from '../../../booksLibrary/models/book';
import './tracker.css';

type TrackerProps = {
  isOpen?: boolean;
  book: Book;
};

export const Tracker = ({ book, isOpen = false }: TrackerProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const trackerTheme = theme === 'dark' ? 'tracker--dark' : 'tracker--light';

  useEffect(() => {
    if (isOpen) divRef.current?.scrollIntoView();
  }, []);

  return (
    <div ref={divRef} className={`tracker ${trackerTheme}`}>
      <Accordion isOpen={isOpen} label="Log progress">
        <TrackerForm book={book} />
      </Accordion>
    </div>
  );
};

export default Tracker;
