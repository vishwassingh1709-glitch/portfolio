import { useEffect, useState } from 'react';

/** Live local time for a timezone, rendered only after mount. */
export function useLocalTime(timeZone = 'Asia/Kolkata') {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IN', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());

    setTime(format());
    const interval = window.setInterval(() => setTime(format()), 30000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return time;
}
