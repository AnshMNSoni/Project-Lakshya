import React, { useState, useEffect } from "react";

const Loader = ({ isLoading, totalTime = 1500 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isLoading && progress < 100) {
      const interval = totalTime / 100; // 15ms per step for 1500ms
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, interval);
    } else if (!isLoading && progress > 0) {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [isLoading, progress, totalTime]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-background dark:bg-gray-900 z-50 transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative w-24 h-24">
        {/* Circular Progress Bar */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="#e0e0e0"
            strokeWidth="4"
            fill="transparent"
            className="opacity-50"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 40 * (progress / 100)}
            strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
            className="transition-all duration-100"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f97316" }} />
              <stop offset="100%" style={{ stopColor: "#f59e0b" }} />
            </linearGradient>
          </defs>
        </svg>
        {/* Moving Gradient Spinner */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin-slow">
            <div className="absolute inset-0 border-4 border-t-orange-500 border-r-orange-400 rounded-full animate-spin-fast"></div>
          </div>
        </div>
        {/* Progress Text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-foreground dark:text-white font-bold text-lg"
        >
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Loader;