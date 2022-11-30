import { useState } from 'react';

export function useDropdown(): { showContent: boolean; handleSetShowContent: () => void } {
  const [showContent, setShowContent] = useState<boolean>(false);

  function handleSetShowContent() {
    setShowContent(!showContent);
  }

  return {
    showContent,
    handleSetShowContent,
  };
}

export default useDropdown;
