import { Params, useLoaderData } from 'react-router-dom';
import { SaveBook } from '../features/saveBook';
import { useInitialFormState } from '../features/saveBook/components/useInitialFormState';

type ActionParams = {
  request: Request;
  params: Params;
};

export async function loader({ params }: ActionParams) {
  return params?.bookId;
}

export const EditBook = () => {
  const bookId = useLoaderData();
  const { initialFormState } = useInitialFormState(bookId as string);

  return <SaveBook title={'Edit Book'} initialState={initialFormState} mode="update" />;
};

export default EditBook;
