import React from "react";
import { LayoutDashboard, Inbox, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-surface flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">DailyWorks</h1>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <NavItem icon={<Inbox size={20} />} label="Inbox" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
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

const NavItem = ({ icon, label, active = false }) => {
  const activeClasses = "bg-primary text-background";
  const inactiveClasses = "hover:bg-gray-700 hover:text-white";

  return (
    <li>
      <a
        href="#"
        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors my-1 ${
          active ? activeClasses : inactiveClasses
        }`}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
};

export default Sidebar;
