import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({
  children,
  timerState,
  onStartTimer,
  onStopTimer,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-background text-text-primary flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          timerState={timerState}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
