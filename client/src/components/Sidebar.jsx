import { NavLink } from "react-router-dom";
import { LayoutDashboard, Inbox, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isSidebarOpen }) => {
  const { logout } = useAuth();
  return (
    <aside
      className={`
        bg-surface w-64 flex flex-col fixed inset-y-0 left-0 z-30
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">DailyWorks</h1>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          <li>
            <SidebarLink
              to="/"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
            />
          </li>
          <li>
            <SidebarLink to="/inbox" icon={<Inbox size={20} />} label="Inbox" />
          </li>
          <li>
            <SidebarLink
              to="/settings"
              icon={<Settings size={20} />}
              label="Settings"
            />
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-2 p-2 rounded-lg text-text-secondary hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => {
  const baseClasses =
    "flex items-center space-x-3 p-2 rounded-lg transition-colors my-1 w-full";
  const activeClasses = "bg-primary text-background";
  const inactiveClasses =
    "text-text-secondary hover:bg-gray-700 hover:text-white";

  return (
    <NavLink
      to={to}
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
