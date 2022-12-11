import { MutableRefObject } from 'react';

type DeleteButtonProps = {
  removeBook: (ids: Record<string, boolean>) => Promise<void>;
  booksSelected: MutableRefObject<Record<string, boolean>>;
  editionMode: boolean;
  defaultView: boolean;
};

export const DeleteButton = ({ defaultView, removeBook, booksSelected, editionMode }: DeleteButtonProps) => {
  function isDeleteButtonDisabled() {
    if (!defaultView) {
      return false;
    } else if (defaultView && editionMode) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <button
      disabled={isDeleteButtonDisabled()}
      onClick={() => {
        removeBook(booksSelected.current);
      }}
    >
      <svg
        className={`${!isDeleteButtonDisabled() ? 'hover:opacity-50' : 'opacity-20'} fill-white stroke-2 mb-[2px]`}
        width={22}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 172.541 172.541"
        xmlSpace="preserve"
      >
        <path d="M166.797 25.078h-43.643V0H49.388v25.078H5.744v15H20.55l10 132.463h111.443l10-132.463h14.805v-15zM64.388 15h43.766v10.078H64.388V15zm63.695 142.541H44.46L35.592 40.078H136.95l-8.867 117.463z" />
        <path d="M80.271 65.693h12v66.232h-12zM57.271 65.693h12v66.232h-12zM103.271 65.693h12v66.232h-12z" />
      </svg>
    </button>
  );
};

export default DeleteButton;
