import { useEffect, useState, useRef } from "react";

interface TimerReturn {
  minutes: string;
  seconds: string;
}

const useTimer = (initialMinutes: number = 20): TimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft]);

  return {
    minutes: Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0"),
    seconds: (timeLeft % 60).toString().padStart(2, "0"),
  };
};

export default useTimer;
