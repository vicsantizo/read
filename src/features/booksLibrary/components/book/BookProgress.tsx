export type BookProgressProps = {
  progress: number;
};

export const BookProgress = ({ progress }: BookProgressProps) => {
  const progressPercentage = String(progress).concat('%');
  return (
    <div className="absolute bg-[#707070] h-[3px] w-[100%] bottom-0">
      <div style={{ width: progressPercentage }} className={`bg-[var(--progress)] h-[100%]`}></div>
    </div>
  );
};

export default BookProgress;
