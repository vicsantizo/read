import { useTheme } from '../../../context/theme/useTheme';
import './statCard.css';

type StatCardProps = {
  title: string;
  text: string;
};

export const StatCard = ({ title, text }: StatCardProps) => {
  const { theme } = useTheme();
  const cardTheme = theme === 'dark' ? 'statcard--dark' : 'statcard--light';
  const titleTheme = theme === 'dark' ? 'statcard__title--dark' : 'statcard__title--light';
  const textTheme = theme === 'dark' ? 'statcard__text--dark' : 'statcard__text--light';

  return (
    <div className={`statcard ${cardTheme}`}>
      <h2 className={`statcard__title ${titleTheme}`}>{title}</h2>
      <p className={`statcard__text ${textTheme}`}>{text}</p>
    </div>
  );
};

export default StatCard;
