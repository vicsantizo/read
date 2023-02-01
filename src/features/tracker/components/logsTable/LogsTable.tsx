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
    <table className="w-full border-collapse rounded-md border-[var(--primary-500)] text-center text-sm">
      <thead className="bg-[var(--primary-500)] text-white">
        <tr>
          <th className="w-[55%] border border-[var(--primary-500)] py-1">Date</th>
          <th className="w-[22.5%] border border-[var(--primary-500)] py-1">From</th>
          <th className="w-[22.5%] border border-[var(--primary-500)] py-1">To</th>
        </tr>
      </thead>
      <tbody>
        {trackingData?.map((log) => {
          return (
            <tr key={log.id}>
              <td className="border border-[var(--primary-500)] py-2">{formatDate(log.date)}</td>
              <td className="border border-[var(--primary-500)] py-2">{log.fromPage}</td>
              <td className="border border-[var(--primary-500)] py-2">{log.toPage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const emptyLogs = (
    <div className="flex h-full min-h-[8rem] items-center rounded-md border border-gray-500">
      <span className="w-full text-center text-sm text-gray-400">No reading history...</span>
    </div>
  );

  if (isTrackingDataEmpty) {
    return emptyLogs;
  }

  return logsTable;
};

export default LogsTable;
