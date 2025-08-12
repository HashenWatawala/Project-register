import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { UserIcon, DocumentIcon } from "@heroicons/react/24/outline";

function useCountUp(end, duration = 2000) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let start = 0;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(end); // ensure it ends exactly at end
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

export default function StatCards({ userCount, pdfCount }) {
  const leftSpring = useSpring({
    from: { opacity: 0, transform: "translateX(-100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { tension: 170, friction: 26 },
    delay: 300,
  });

  const rightSpring = useSpring({
    from: { opacity: 0, transform: "translateX(100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { tension: 170, friction: 26 },
    delay: 600,
  });

  const animatedUserCount = useCountUp(userCount, 2000);
  const animatedPdfCount = useCountUp(pdfCount, 2000);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10 px-4">
      <animated.div
        style={leftSpring}
        className="max-w-xs w-full bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center space-x-4"
      >
        <UserIcon className="w-12 h-12 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Registered Users</p>
          <p className="text-4xl font-bold">{animatedUserCount.toLocaleString()}</p>
        </div>
      </animated.div>

      <animated.div
        style={rightSpring}
        className="max-w-xs w-full bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center space-x-4"
      >
        <DocumentIcon className="w-12 h-12 text-green-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Registered PDFs</p>
          <p className="text-4xl font-bold">{animatedPdfCount.toLocaleString()}</p>
        </div>
      </animated.div>
    </div>
  );
}
