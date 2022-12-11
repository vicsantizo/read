import { Library } from '../library';
import { useBooksStore } from '../library/dataStores/useBookStore';

import './css/home.css';

const Home = () => {
  const { data, error, createBook, removeBook } = useBooksStore();
  return (
    <>
      <div className="home container mx-auto">
        <Library data={data} error={error} createBook={createBook} removeBook={removeBook} />
      </div>
    </>
  );
};

export default Home;
