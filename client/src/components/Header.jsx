import { Play, Square, Bell, User, Menu } from "lucide-react";
import LiveTimer from "./LiveTimer";
import { useAuth } from "../contexts/AuthContext";

const getInitials = (name = "") => {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${
      nameParts[nameParts.length - 1][0]
    }`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Header = ({ timerState, onStartTimer, onStopTimer, onMenuClick }) => {
  const { user } = useAuth();
  const firstName = user ? user.name.split(" ")[0] : "User";
  const userInitials = user ? getInitials(user.name) : "?";

  return (
    <header className="bg-surface border-b border-gray-700 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-text-secondary hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-xl font-semibold">Hello, {firstName}!</h2>
          <p className="text-sm text-text-secondary">
            It's good to see you again.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {timerState.isRunning ? (
          <>
            <LiveTimer startTime={timerState.startTime} />
            <button
              onClick={onStopTimer}
              className="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 rounded-lg flex items-center"
              aria-label="Stop timer"
            >
              <Square size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={onStartTimer}
            className="bg-primary hover:bg-primary-hover text-background font-bold py-2 px-3 sm:px-4 rounded-lg flex items-center space-x-2"
          >
            <Play size={20} />
            <span className="hidden sm:inline">Start Time Tracker</span>
          </button>
        )}
        <button
          className="p-2 rounded-full hover:bg-gray-700"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-background">
          {user ? userInitials : <User size={20} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
