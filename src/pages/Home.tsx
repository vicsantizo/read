import { Library } from '../library';
import { useBooksStore } from '../library/dataStores/useBookStore';

import './css/home.css';

const Home = () => {
  const { data, error, createBook } = useBooksStore();
  return (
    <>
      <div className="home">
        <Library books={data} />
      </div>
    </>
  );
};

export default Home;
