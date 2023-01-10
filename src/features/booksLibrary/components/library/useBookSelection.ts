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

  return {
    booksSelection,
    setBooksSelection: handleSelection,
    countElementsSelected,
  };
};

export default useBookSelection;
