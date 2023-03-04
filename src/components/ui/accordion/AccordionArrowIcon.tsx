type AccordionArrowIconProps = {
  isContentShowing: boolean;
};

export const AccordionArrowIcon = ({ isContentShowing }: AccordionArrowIconProps) => {
  const arrowDirection = isContentShowing
    ? 'accordion__arrow accordion__arrow--up'
    : 'accordion__arrow accordion__arrow--down';
  return <span className={arrowDirection}></span>;
};

export default AccordionArrowIcon;
