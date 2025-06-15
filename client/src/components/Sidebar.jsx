import { NavLink } from "react-router-dom";
import { LayoutDashboard, Inbox, Settings, LogOut, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (closeSidebar) {
      closeSidebar();
    }
    logout();
  };

  return (
    <aside
      className={`
        bg-surface w-64 flex flex-col fixed inset-y-0 left-0 z-30
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">DailyWorks</h1>
        <button
          onClick={closeSidebar}
          className="lg:hidden text-text-secondary hover:text-white"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4">
        <ul>
          <li>
            <SidebarLink
              to="/"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              onClick={closeSidebar}
            />
          </li>
          <li>
            <SidebarLink
              to="/inbox"
              icon={<Inbox size={20} />}
              label="Inbox"
              onClick={closeSidebar}
            />
          </li>
          <li>
            <SidebarLink
              to="/settings"
              icon={<Settings size={20} />}
              label="Settings"
              onClick={closeSidebar}
            />
          </li>
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 p-2 rounded-lg text-text-secondary hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, onClick }) => {
  const baseClasses =
    "flex items-center space-x-3 p-2 rounded-lg transition-colors my-1 w-full";
  const activeClasses = "bg-primary text-background";
  const inactiveClasses =
    "text-text-secondary hover:bg-gray-700 hover:text-white";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
