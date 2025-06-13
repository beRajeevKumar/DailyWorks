import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ loading, error, tasks, onDelete, onToggle, onEdit }) => {
  if (loading) {
    return (
      <p className="text-text-secondary text-center mt-8">Loading tasks...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))
      ) : (
        <div className="bg-surface p-8 rounded-lg text-center mt-8">
          <h3 className="text-xl font-semibold text-text-primary">
            All Clear!
          </h3>
          <p className="text-text-secondary mt-2">
            You have no pending tasks. Click "Add Task" to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
