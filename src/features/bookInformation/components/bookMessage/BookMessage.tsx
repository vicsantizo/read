import { useTheme } from '../../../../context/theme/useTheme';
import './bookMessage.css';

type BookMessageProps = {
  text: string;
};

export const BookMessage = ({ text }: BookMessageProps) => {
  const { theme } = useTheme();
  const messageTheme = theme === 'dark' ? 'bookinfo__message--dark' : 'bookinfo__message--light';
  return (
    <div className={`bookinfo__message ${messageTheme}`}>
      <div className="bookinfo__message-indicator"></div>
      <p className="bookinfo__message-text">
        <span className="bookinfo__message-title">Note: </span>
        {text}
      </p>
    </div>
  );
};

export default BookMessage;
