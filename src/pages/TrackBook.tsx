import { Params, useLoaderData } from 'react-router-dom';
import { TrackerForm } from '../features/tracker/components/trackerForm/TrackerForm';
import { useBook } from '../features/tracker/components/trackerForm/useBook';

type ActionParams = {
  request: Request;
  params: Params;
};

export async function loader({ params }: ActionParams) {
  return params?.bookId;
}

export const TrackBook = () => {
  const bookId = useLoaderData() as string;
  const { bookData } = useBook(bookId);

  // the prop passed is going to be undefined on first render
  return <TrackerForm bookData={bookData!} />;
};

export default TrackBook;
