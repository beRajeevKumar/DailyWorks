import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({
  children,
  timerState,
  onStartTimer,
  onStopTimer,
}) => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          timerState={timerState}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
