import { BookTrackerLog } from '../../../booksLibrary/models/bookTrackerLog';
import { formatDate } from '../../../../utils/dateFormat';
import './bookTrackingLogs.css';

type BookTrackingLogsProps = {
  trackerLog: BookTrackerLog;
  limit?: number;
};

export const BookTrackingLogs = ({ trackerLog }: BookTrackingLogsProps) => {
  const logs = [...trackerLog.getAllEntries()].reverse();
  const isTrackerLogEmpty = logs.length === 0;

  if (isTrackerLogEmpty) {
    return null;
  }

  return (
    <div className="table-wrapper">
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
    </div>
  );
};

export default BookTrackingLogs;
