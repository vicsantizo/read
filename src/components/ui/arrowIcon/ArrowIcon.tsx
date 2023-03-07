import './arrowIcon.css';

type ArrowIconProps = {
  isArrowUp: boolean;
};

export const ArrowIcon = ({ isArrowUp }: ArrowIconProps) => {
  const arrowDirection = isArrowUp ? 'arrow arrow--up' : 'arrow arrow--down';
  return <span className={arrowDirection}></span>;
};

export default ArrowIcon;
