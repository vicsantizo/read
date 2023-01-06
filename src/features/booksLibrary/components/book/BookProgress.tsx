export type BookProgressProps = {
  progress: number;
};

export const BookProgress = ({ progress }: BookProgressProps) => {
  return (
    <div className="absolute bg-[#707070] h-[3px] w-[100%] bottom-0">
      <div className={`bg-[var(--progress)] h-[100%] w-[${progress}%]`}></div>
    </div>
  );
};

export default BookProgress;
