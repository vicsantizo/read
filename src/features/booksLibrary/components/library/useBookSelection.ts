import { useState } from 'react';

export const useBookSelection = () => {
  const [booksSelection, setBooksSelection] = useState<Map<string, boolean>>(new Map());
  const handleSelection = (id: string) => {
    setBooksSelection((p) => {
      return new Map(p).set(id, !p.get(id));
    });
  };

  const countElementsSelected = () => {
    let booksSelected = 0;
    for (const [, value] of booksSelection.entries()) {
      if (value === true) booksSelected++;
    }
    return booksSelected;
  };

  const getSelectedBook = () => {
    for (const [key, value] of booksSelection.entries()) {
      if (value === true) return key;
    }
    return undefined;
  };

  const getArrayOfCurrentlySelectedBooks = () => {
    const selectedBooks: string[] = [];
    for (const [key, value] of booksSelection.entries()) {
      if (value === true) selectedBooks.push(key);
    }
    return selectedBooks;
  };

  const resetBooksSelection = () => {
    setBooksSelection(new Map());
  };

  return {
    booksSelection,
    setBooksSelection: handleSelection,
    countElementsSelected,
    getSelectedBook,
    getArrayOfCurrentlySelectedBooks,
    resetBooksSelection,
  };
};

export default useBookSelection;
