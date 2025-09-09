"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.floor(latest * data.length);
    setActiveIndex(Math.min(newIndex, data.length - 1));
  });

  return (
    <div
      className="w-full bg-background dark:bg-background font-space-grotesk md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 text-foreground dark:text-foreground max-w-4xl font-bold">
          Your College Selection Journey
        </h2>
        <p className="text-muted-foreground dark:text-muted-foreground text-base md:text-lg max-w-2xl">
          Follow these steps to find your perfect college match through our intelligent platform.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = index <= activeIndex;
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-20 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div 
                  className={`h-12 absolute left-3 md:left-3 w-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-500 ${
                    isActive 
                      ? 'bg-white dark:bg-gray-900 border-orange-500' 
                      : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`h-6 w-6 rounded-full transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                        : 'bg-gray-400 dark:bg-gray-500'
                    }`}
                    animate={{
                      scale: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.h3 
                  className={`hidden md:block text-xl md:pl-20 md:text-4xl font-bold font-space-grotesk transition-all duration-500 ${
                    isActive 
                      ? 'text-orange-500 dark:text-orange-400' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  animate={{
                    x: isActive ? 0 : -10,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <motion.h3 
                  className={`md:hidden block text-2xl mb-6 text-left font-bold font-space-grotesk transition-all duration-500 ${
                    isActive 
                      ? 'text-orange-500 dark:text-orange-400' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
                <motion.div 
                  className={`border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-500 ${
                    isActive 
                      ? 'bg-card dark:bg-card border-orange-200 dark:border-orange-800' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  }`}
                  animate={{
                    y: isActive ? 0 : 10,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.content}
                </motion.div>
              </div>
            </div>
          );
        })}
        <div
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent"
          style={{
            height: height + "px",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-orange-500 via-red-500 to-orange-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
