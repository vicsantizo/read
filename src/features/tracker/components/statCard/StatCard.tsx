import { useTheme } from '../../../../context/theme/useTheme';

type StatCardProps = {
  title: string;
  content: string;
};

export const StatCard = ({ title, content }: StatCardProps) => {
  const { theme } = useTheme();
  const cardDefaultClasses = 'flex flex-col items-center gap-2 p-2 rounded-md';
  const titleDefaultClasses = 'text-gray-500 text-sm';
  const contentDefaultClasses = '';

  const cardLightTheme = 'border border-gray-400 bg-white';
  const contentLightTheme = 'text-[var(--primary-500)]';

  const cardDarkTheme = 'bg-[#2f2f35]';
  const contentDarkTheme = 'text-[var(--primary-300)]';

  return (
    <div className={`${cardDefaultClasses} ${theme == 'dark' ? cardDarkTheme : cardLightTheme}`}>
      <span className={`${titleDefaultClasses}`}>{title}</span>
      <span className={`${contentDefaultClasses} ${theme == 'dark' ? contentDarkTheme : contentLightTheme}`}>
        {content}
      </span>
    </div>
  );
};

export default StatCard;
