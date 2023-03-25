import { Library } from '../features/BooksLibrary/components/library';
import '../assets/css/homePage.css';

const Home = () => {
  return (
    <div className="home container mx-auto">
      <Library />
    </div>
  );
};

export default Home;
