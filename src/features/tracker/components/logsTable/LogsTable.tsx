import { TrackerData } from '../../../booksLibrary/models/tracker';

type LogsTableProps = {
  trackingData: TrackerData[];
};

export const LogsTable = ({ trackingData }: LogsTableProps) => {
  const isTrackingDataEmpty = trackingData?.length === 0;
  const logsTable = (
    <table className="w-full border-collapse border-[var(--primary-500)] rounded-md text-sm text-center">
      <thead className="bg-[var(--primary-500)] text-white">
        <tr>
          <th className="py-1 border border-[var(--primary-500)] w-[55%]">Date</th>
          <th className="py-1 border border-[var(--primary-500)] w-[22.5%]">From</th>
          <th className="py-1 border border-[var(--primary-500)] w-[22.5%]">To</th>
        </tr>
      </thead>
      <tbody>
        {trackingData?.map((log) => {
          return (
            <tr key={log.id}>
              <td className="py-2 border border-[var(--primary-500)]">{log.date}</td>
              <td className="py-2 border border-[var(--primary-500)]">{log.fromPage}</td>
              <td className="py-2 border border-[var(--primary-500)]">{log.toPage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const emptyLogs = (
    <div className="flex h-full items-center border border-gray-500 rounded-md min-h-[8rem]">
      <span className="text-center text-sm w-full text-gray-400">No reading history...</span>
    </div>
  );

  if (isTrackingDataEmpty) {
    return emptyLogs;
  }

  return logsTable;
};

export default LogsTable;
