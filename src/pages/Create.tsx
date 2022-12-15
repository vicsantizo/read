import { useLocation } from 'react-router-dom';
import { BookForm } from '../createBook/';

const Create = () => {
  const location = useLocation();

  return (
    <div>
      <BookForm state={location.state?.book} />
    </div>
  );
};

export default Create;
