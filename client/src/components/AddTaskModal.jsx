import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import api from "../services/api";
import { X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AddTaskModal = ({
  isOpen,
  onClose,
  onTaskAdded,
  taskToEdit,
  onTaskUpdated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const isEditMode = !!taskToEdit;
  useEffect(() => {
    if (isEditMode && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Medium");
      if (taskToEdit.dueDate) {
        setDueDate(format(new Date(taskToEdit.dueDate), "yyyy-MM-dd"));
      }
    }
  }, [taskToEdit, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }

    const taskData = { title, description, priority, dueDate: dueDate || null };

    try {
      if (isEditMode) {
        const res = await api.put(`/tasks/${taskToEdit._id}`, taskData);
        onTaskUpdated(res.data);
        toast.success("Task updated successfully!");
      } else {
        const res = await api.post("/tasks", taskData);
        onTaskAdded(res.data);
        toast.success("Task created successfully!");
      }
      handleClose();
    } catch (err) {
      console.error("Failed to save task:", err);
      setError("Failed to save task. Please try again.");
      toast.error("Oops! Something went wrong.");
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setError("");
    setPriority("Medium");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-surface rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="title"
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Design the new homepage"
            required
          />
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about the task..."
              rows="3"
              className="w-full bg-gray-800 border border-gray-600 text-text-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Input
              id="dueDate"
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-text-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-auto">
              {isEditMode ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
