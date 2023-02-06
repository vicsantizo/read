import { TrackerData } from '../../../booksLibrary/models/tracker';

type LogsTableProps = {
  trackingData: TrackerData[];
};

function formatDate(date: string) {
  const myDate = new Date(date);
  const formattedDate = myDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  if (formattedDate == 'Invalid Date') return 'N/A';
  return formattedDate;
}

export const LogsTable = ({ trackingData }: LogsTableProps) => {
  const isTrackingDataEmpty = trackingData?.length === 0;
  const logsTable = (
    <table className="w-full overflow-hidden rounded-xl text-sm [box-shadow:0_0_4px_hsl(0_0%_0%/.2)]">
      <thead className="border border-t-0 border-l-0 border-r-0 border-[hsl(0_0%_25%/.4)]">
        <tr>
          <th className="w-[55%] py-2 pl-4 pr-2 text-left">Date</th>
          <th className="w-[22.5%] py-2 px-2 text-right">From</th>
          <th className="w-[22.5%] py-2 pl-2 pr-4 text-right">To</th>
        </tr>
      </thead>
      <tbody>
        {trackingData?.map((log) => {
          return (
            <tr key={log.id}>
              <td className="py-3 pl-4 pr-2 text-left">{formatDate(log.date)}</td>
              <td className="py-3 px-2 text-right">{log.fromPage}</td>
              <td className="py-3 pl-2 pr-4 text-right">{log.toPage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const emptyLogs = (
    <div className="flex h-full min-h-[8rem] flex-col items-center justify-center gap-1 rounded-xl [box-shadow:0_0_4px_hsl(0_0%_0%/.2)]">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-gray-500" width={30}>
        <g>
          <path d="M1.5 1.25a.75.75 0 0 1 1.5 0v1.851A7 7 0 1 1 1 8a.75.75 0 0 1 1.5 0 5.5 5.5 0 1 0 1.725-4H5.75a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5z" />
          <path d="M8.25 4a.75.75 0 0 1 .75.75v3.763l1.805.802a.75.75 0 0 1-.61 1.37l-2.25-1A.75.75 0 0 1 7.5 9V4.75A.75.75 0 0 1 8.25 4z" />
        </g>
      </svg>
      <span className="w-full text-center text-sm text-gray-500">No reading history...</span>
    </div>
  );

  if (isTrackingDataEmpty) {
    return emptyLogs;
  }

  return logsTable;
};

export default LogsTable;
