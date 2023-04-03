export const BookTrackingLogsEmpty = () => {
  return (
    <div className="bookinfo__tracker-empty">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="bookinfo__tracker-empty-icon" width={30}>
        <g>
          <path d="M1.5 1.25a.75.75 0 0 1 1.5 0v1.851A7 7 0 1 1 1 8a.75.75 0 0 1 1.5 0 5.5 5.5 0 1 0 1.725-4H5.75a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5z" />
          <path d="M8.25 4a.75.75 0 0 1 .75.75v3.763l1.805.802a.75.75 0 0 1-.61 1.37l-2.25-1A.75.75 0 0 1 7.5 9V4.75A.75.75 0 0 1 8.25 4z" />
        </g>
      </svg>
      <span className="text-gray-500 w-full text-center text-sm">No reading history...</span>
    </div>
  );
};

export default BookTrackingLogsEmpty;
