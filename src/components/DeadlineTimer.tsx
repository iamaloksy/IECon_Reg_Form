import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock } from "lucide-react";

interface DeadlineTimerProps {
  deadline: Date;
}

const DeadlineTimer = ({ deadline }: DeadlineTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = deadline.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) {
    return null;
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <Alert className={`mb-6 ${isUrgent ? 'border-destructive bg-destructive/10' : 'border-primary bg-primary/10'}`}>
      <Clock className={`h-4 w-4 ${isUrgent ? 'text-destructive' : 'text-primary'}`} />
      <AlertDescription className="ml-2">
        <span className="font-semibold">
          {isUrgent ? '⚠️ Registration closing soon: ' : 'Time remaining: '}
        </span>
        <span className="font-mono font-bold">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {String(timeLeft.hours).padStart(2, '0')}h{' '}
          {String(timeLeft.minutes).padStart(2, '0')}m{' '}
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
        <span className="text-sm text-muted-foreground ml-2">
          (Deadline: {deadline.toLocaleDateString('en-IN', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })})
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default DeadlineTimer;
