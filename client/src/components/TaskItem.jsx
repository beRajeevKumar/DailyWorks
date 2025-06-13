import React from "react";
import { Circle, CheckCircle, Trash2, Edit } from "lucide-react";

const priorityClasses = {
  High: "border-red-500",
  Medium: "border-yellow-500",
  Low: "border-blue-500",
};

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div className="bg-surface p-4 rounded-lg flex items-center justify-between transition-all hover:bg-gray-800">
      <div className="flex items-center space-x-4">
        <button onClick={() => onToggle(task._id, task.completed)}>
          {task.completed ? (
            <CheckCircle size={24} className="text-primary" />
          ) : (
            <Circle size={24} className="text-text-secondary" />
          )}
        </button>

        <div>
          <p
            className={`text-text-primary ${
              task.completed ? "line-through text-text-secondary" : ""
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span
          className={`text-sm px-2 py-1 rounded-full border-2 ${
            priorityClasses[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <button
          onClick={() => onEdit(task)}
          className="text-text-secondary hover:text-white"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-text-secondary hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
