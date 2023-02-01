type BookCategoryProps = {
  category: string;
};

export const BookCategory = ({ category }: BookCategoryProps) => {
  return (
    <div className="rounded-2xl bg-[var(--primary-500)] py-1 px-3">
      <span className="w-full text-sm text-gray-200">{category}</span>
    </div>
  );
};

export default BookCategory;
