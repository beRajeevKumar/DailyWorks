import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import ProductivityPanel from "../components/ProductivityPanel";
import CalendarPanel from "../components/CalendarPanel";
import api from "../services/api";
import { Plus } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [timerState, setTimerState] = useState({
    isRunning: false,
    startTime: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksRes, sessionsRes] = await Promise.all([
          api.get("/tasks"),
          api.get("/sessions"),
        ]);
        setTasks(tasksRes.data);
        setSessions(sessionsRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setTaskToEdit(null);
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleTaskDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleTaskToggle = async (id, currentStatus) => {
    try {
      const res = await api.put(`/tasks/${id}`, {
        completed: !currentStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: res.data.completed } : task
        )
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleStartTimer = () => {
    setTimerState({ isRunning: true, startTime: Date.now() });
  };

  const handleStopTimer = async () => {
    const endTime = Date.now();
    const durationInSeconds = Math.round(
      (endTime - timerState.startTime) / 1000
    );
    try {
      const payload = {
        startTime: new Date(timerState.startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        duration: durationInSeconds,
      };
      const res = await api.post("/sessions", payload);
      setSessions((prevSessions) => [res.data, ...prevSessions]);
    } catch (err) {
      console.error("Failed to save session:", err);
    } finally {
      setTimerState({ isRunning: false, startTime: null });
    }
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout
      timerState={timerState}
      onStartTimer={handleStartTimer}
      onStopTimer={handleStopTimer}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-hover text-background font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TaskList
            loading={loading}
            error={error}
            tasks={tasks}
            onDelete={handleTaskDelete}
            onToggle={handleTaskToggle}
            onEdit={handleEditClick}
          />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <ProductivityPanel tasks={tasks} sessions={sessions} />
          <CalendarPanel tasks={tasks} />
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
        taskToEdit={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />
    </DashboardLayout>
  );
}

export default App;
