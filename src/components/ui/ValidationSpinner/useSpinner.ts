import { useEffect, useRef } from 'react';

export type SpinnerStates = 'SUCCESS' | 'FAILURE' | 'LOADING';

export const useSpinner = (state: SpinnerStates) => {
  const spinner = useRef<SVGPathElement | null>(null);
  const status = useRef<SVGPathElement | null>(null);
  const icon = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (state === 'LOADING') {
      if (spinner.current) spinner.current.classList.remove('hide');
      if (icon.current) icon.current.classList.add('loading--spin');
    } else if (state === 'SUCCESS') {
      if (status.current) status.current.classList.add('success');
      if (spinner.current) spinner.current.classList.remove('hide');
      if (icon.current) icon.current.classList.add('status--spin');
    } else {
      if (status.current) status.current.classList.add('error');
      if (spinner.current) spinner.current.classList.remove('hide');
      if (icon.current) icon.current.classList.add('status--spin');
    }
    const id = setTimeout(() => {
      if (spinner.current) spinner.current.classList.add('hide');
      if (status.current) status.current.classList.remove('hide');
    }, 1600);

    return () => {
      clearTimeout(id);
    };
  });

  return {
    spinner,
    status,
    icon,
  };
};

export default useSpinner;
