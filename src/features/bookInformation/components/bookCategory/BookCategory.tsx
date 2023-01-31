type BookCategoryProps = {
  category: string;
};

export const BookCategory = ({ category }: BookCategoryProps) => {
  return (
    <div className="bg-[var(--primary-500)] rounded-2xl py-1 px-3">
      <span className="w-full text-gray-200 text-sm">{category}</span>
    </div>
  );
};

export default BookCategory;
