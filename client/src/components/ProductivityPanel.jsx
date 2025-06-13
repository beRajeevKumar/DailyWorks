import React from "react";
import { isToday, isThisWeek, parseISO } from "date-fns";

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || totalSeconds < 60) return `${totalSeconds || 0}s`;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  return result.trim() || "0m";
};

const ProductivityPanel = ({ tasks = [], sessions = [] }) => {
  const completedToday = tasks.filter(
    (t) => t.completed && isToday(parseISO(t.updatedAt))
  ).length;

  const completedThisWeek = tasks.filter(
    (t) => t.completed && isThisWeek(parseISO(t.updatedAt))
  ).length;

  const timeTrackedToday = sessions
    .filter((s) => s.startTime && isToday(parseISO(s.startTime)))
    .reduce((total, session) => total + session.duration, 0);

  const timeTrackedThisWeek = sessions
    .filter((s) => s.startTime && isThisWeek(parseISO(s.startTime)))
    .reduce((total, session) => total + session.duration, 0);

  return (
    <div className="bg-surface p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-text-primary mb-6">
        Productivity Stats
      </h3>
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Time Tracked (Today)</span>
          <span className="font-bold text-lg text-primary">
            {formatDuration(timeTrackedToday)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Time Tracked (Week)</span>
          <span className="font-bold text-lg text-white">
            {formatDuration(timeTrackedThisWeek)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tasks Completed (Today)</span>
          <span className="font-bold text-lg text-white">{completedToday}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tasks Completed (Week)</span>
          <span className="font-bold text-lg text-white">
            {completedThisWeek}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityPanel;
