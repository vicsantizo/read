import { SaveBook } from '../features/saveBook';

const initialFormState = {
  id: '',
  title: '',
  author: '',
  category: '',
  description: '',
  pages: '',
  isFavorite: false,
};

export const CreateBook = () => {
  return <SaveBook title="Add Book" initialState={initialFormState} mode="create" />;
};

export default CreateBook;
