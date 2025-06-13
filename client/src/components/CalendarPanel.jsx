import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parseISO, startOfDay, isSameDay } from "date-fns";

const CalendarPanel = ({ tasks }) => {
  const [selectedDay, setSelectedDay] = useState(startOfDay(new Date()));
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState([]);

  const dueDays = tasks
    .filter((task) => task.dueDate)
    .map((task) => startOfDay(parseISO(task.dueDate)));

  const modifiers = { due: dueDays };
  const modifierStyles = { due: { color: "#A3E635", fontWeight: "bold" } };

  useEffect(() => {
    const tasksOnDay = tasks.filter(
      (task) =>
        task.dueDate &&
        isSameDay(startOfDay(parseISO(task.dueDate)), selectedDay)
    );
    setTasksForSelectedDay(tasksOnDay);
  }, [selectedDay, tasks]);

  const footer = (
    <div className="mt-4 pt-4 border-t border-gray-700 w-full text-left">
      {tasksForSelectedDay.length > 0 ? (
        <>
          <h4 className="font-semibold text-text-primary mb-2">
            Tasks for {format(selectedDay, "MMM d")}
          </h4>
          <ul className="space-y-2">
            {tasksForSelectedDay.map((task) => (
              <li
                key={task._id}
                className="text-sm text-text-secondary flex items-center"
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                    task.completed ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-center text-text-secondary">
          No tasks due on {format(selectedDay, "MMM d")}.
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-surface p-4 rounded-lg flex justify-center">
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={(day) =>
          setSelectedDay(day ? startOfDay(day) : startOfDay(new Date()))
        }
        modifiers={modifiers}
        modifierStyles={modifierStyles}
        footer={footer}
        showOutsideDays
        fixedWeeks
      />
    </div>
  );
};

export default CalendarPanel;
