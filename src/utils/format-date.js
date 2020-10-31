import moment from 'moment';

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, isLocalTime) {
  const timeToFormat = moment(timestamp);
  if (!isLocalTime) {
    timeToFormat.parseZone();
  }
  return timeToFormat.format('MMMM DD, YYYY, hh:mm:ss A Z');
}
