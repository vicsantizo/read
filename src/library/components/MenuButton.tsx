import { useState } from 'react';

type MenuButtonProps = {
  handleView: () => void;
};

const MenuButton = ({ handleView }: MenuButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleClick = () => {
    setIsActive((prev) => !prev);
  };
  const listViewIcon = (
    <svg
      className="fill-[white] hover:fill-[#9BC1BC]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 297 297"
      xmlSpace="preserve"
      width={22}
      aria-hidden="true"
    >
      <path d="M279.368 24.726H102.992c-9.722 0-17.632 7.91-17.632 17.632V67.92c0 9.722 7.91 17.632 17.632 17.632h176.376c9.722 0 17.632-7.91 17.632-17.632V42.358c0-9.722-7.91-17.632-17.632-17.632zM279.368 118.087H102.992c-9.722 0-17.632 7.91-17.632 17.632v25.562c0 9.722 7.91 17.632 17.632 17.632h176.376c9.722 0 17.632-7.91 17.632-17.632v-25.562c0-9.722-7.91-17.632-17.632-17.632zM279.368 211.448H102.992c-9.722 0-17.632 7.91-17.632 17.633v25.561c0 9.722 7.91 17.632 17.632 17.632h176.376c9.722 0 17.632-7.91 17.632-17.632v-25.561c0-9.723-7.91-17.633-17.632-17.633zM45.965 24.726H17.632C7.91 24.726 0 32.636 0 42.358V67.92c0 9.722 7.91 17.632 17.632 17.632h28.333c9.722 0 17.632-7.91 17.632-17.632V42.358c0-9.722-7.91-17.632-17.632-17.632zM45.965 118.087H17.632C7.91 118.087 0 125.997 0 135.719v25.562c0 9.722 7.91 17.632 17.632 17.632h28.333c9.722 0 17.632-7.91 17.632-17.632v-25.562c0-9.722-7.91-17.632-17.632-17.632zM45.965 211.448H17.632C7.91 211.448 0 219.358 0 229.081v25.561c0 9.722 7.91 17.632 17.632 17.632h28.333c9.722 0 17.632-7.91 17.632-17.632v-25.561c0-9.723-7.91-17.633-17.632-17.633z" />
    </svg>
  );

  const gridViewIcon = (
    <svg
      className="fill-white hover:opacity-50"
      aria-hidden="true"
      width={22}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path fill="none" d="M0 0h16v16H0z" />
      <path d="M1 1h4v4H1V1zm5 0h4v4H6V1zm5 0h4v4h-4V1zM1 6h4v4H1V6zm5 0h4v4H6V6zm5 0h4v4h-4V6zM1 11h4v4H1v-4zm5 0h4v4H6v-4zm5 0h4v4h-4v-4z" />
    </svg>
  );
  return (
    <button
      onClick={() => {
        handleClick();
        handleView();
      }}
      title={`${isActive ? 'Go to List view' : 'Go to Grid view'}`}
    >
      {isActive ? gridViewIcon : listViewIcon}
    </button>
  );
};

export default MenuButton;
