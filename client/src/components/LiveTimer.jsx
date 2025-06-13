import React, { useState, useEffect } from "react";

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
};

const LiveTimer = ({ startTime }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="bg-green-500 bg-opacity-20 text-primary font-mono text-lg px-4 py-2 rounded-lg">
      {formatTime(elapsedSeconds)}
    </div>
  );
};

export default LiveTimer;
