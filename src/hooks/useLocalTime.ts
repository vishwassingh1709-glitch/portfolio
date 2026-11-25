import { useEffect, useState } from 'react';

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

/** Live local time for a timezone, refreshed every 30 seconds. */
export function useLocalTime(timeZone = 'Asia/Kolkata') {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime(timeZone)), 30000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return time;
}
