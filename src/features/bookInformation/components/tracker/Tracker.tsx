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
  const trackerDescTheme = theme === 'dark' ? 'tracker__desc--dark' : 'tracker__desc--light';

  useEffect(() => {
    if (isOpen) divRef.current?.scrollIntoView();
  }, []);

  return (
    <div ref={divRef} className={`tracker ${trackerTheme}`}>
      <Accordion isOpen={isOpen} label="Log progress">
        <p className={`tracker__desc ${trackerDescTheme}`}>Enter the date and range of pages you have read</p>
        <TrackerForm book={book} />
      </Accordion>
    </div>
  );
};

export default Tracker;
