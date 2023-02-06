export type BookProgressProps = {
  progress: number;
};

export const BookProgress = ({ progress }: BookProgressProps) => {
  const progressPercentage = String(progress).concat('%');
  return (
    <div className="absolute bottom-0 h-[3px] w-[100%] overflow-hidden bg-[#707070]">
      <div style={{ width: progressPercentage }} className={`h-[100%] bg-[var(--progress)]`}></div>
    </div>
  );
};

export default BookProgress;
