import { useTheme } from '../../../../context/theme/useTheme';

type BookDescriptionProps = {
  description: string;
};

export const BookDescription = ({ description }: BookDescriptionProps) => {
  const { theme } = useTheme();
  const descriptionLightTheme = 'border border-gray-400 bg-white text-black';
  const descriptionDarkTheme = 'text-gray-300 bg-[#2f2f35]';

  return (
    <div className="flex flex-col gap-1">
      <h2 className={`text-sm text-gray-500`}>Description</h2>
      <p
        className={`max-h-[10rem] overflow-y-scroll rounded-md p-2 ${
          theme == 'dark' ? descriptionDarkTheme : descriptionLightTheme
        }`}
      >
        {description || 'No description available.'}
      </p>
    </div>
  );
};

export default BookDescription;
