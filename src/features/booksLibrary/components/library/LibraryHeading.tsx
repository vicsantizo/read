import { AddButton } from '../buttons';

export const LibraryHeading = () => {
  return (
    <div className="library__heading">
      <h1 className="library__title">My Library</h1>

      <span className="library__actions">
        <AddButton to="/books/new" />
      </span>
    </div>
  );
};

export default LibraryHeading;
