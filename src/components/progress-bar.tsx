import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { Progress } from './ui/progress';

const ProgressBar = ({ isResponseEnd }: { isResponseEnd: boolean }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous intervals and timeouts
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setProgress(0);
    setVisible(true);

    if (isResponseEnd) {
      setProgress(100);
      timeoutRef.current = setTimeout(() => setVisible(false), 1500);
    } else {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(intervalRef.current!);
            return prev;
          }
          return prev + 5;
        });
      }, 300);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isResponseEnd]);

  return (
    <div className='w-full'>
      <Progress
        value={progress}
        max={100}
        color='primary'
        className={cn('rounded-none h-1 transition-opacity duration-500', !visible && 'opacity-0')}
      />
    </div>
  );
};

export default ProgressBar;
