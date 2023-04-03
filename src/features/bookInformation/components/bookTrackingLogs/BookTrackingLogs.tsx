import { BookTrackerLog } from '../../../booksLibrary/models/bookTrackerLog';
import { BookTrackingLogsEmpty } from './BookTrackingLogsEmpty';
import { formatDate } from '../../../../utils/dateFormat';
import './bookTrackingLogs.css';

type BookTrackingLogsProps = {
  trackerLog: BookTrackerLog;
  limit?: number;
};

export const BookTrackingLogs = ({ trackerLog, limit = 5 }: BookTrackingLogsProps) => {
  const logs = [...trackerLog.getAllEntries()];
  const isTrackerLogEmpty = logs.length === 0;
  logs.splice(limit);

  if (isTrackerLogEmpty) {
    return <BookTrackingLogsEmpty />;
  }

  return (
    <table className="table--alternate-primary table">
      <thead>
        <tr>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.getId()}>
            <td>{formatDate(log.getDate())}</td>
            <td>{log.getFromPage()}</td>
            <td>{log.getToPage()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTrackingLogs;
