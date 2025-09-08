import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RobotCheckProps {
  onVerified: (verified: boolean) => void;
  className?: string;
}

const RobotCheck = ({ onVerified, className = "" }: RobotCheckProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleCheck = async () => {
    if (isVerified) return;
    
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsChecked(true);
    setIsVerified(true);
    onVerified(true);
  };

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        setIsChecked(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  return (
    <div className={`glass-effect p-4 rounded-xl border border-primary/20 flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5 ${className}`}>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheck}
          disabled={isLoading || isVerified}
          className={`w-6 h-6 p-0 border-2 rounded ${
            isVerified 
              ? 'border-success bg-success hover:bg-success' 
              : 'border-primary hover:border-primary/80'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : isVerified ? (
            <CheckCircle className="w-3 h-3 text-white" />
          ) : null}
        </Button>
        <span className="text-sm text-muted-foreground">
          {isVerified ? "Verified human user" : "I'm not a robot"}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4 text-primary" />
        <div className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
          Lakshya AI Security
        </div>
      </div>
    </div>
  );
};

export default RobotCheck;