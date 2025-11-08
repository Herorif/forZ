import { useState, useEffect } from 'react';

interface CountdownProps {
  date: string;
  onEnd?: () => void;
}

export function Countdown({ date, onEnd }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(date).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('EXPIRED');
        if (onEnd) {
          onEnd();
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date, onEnd]);

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
}