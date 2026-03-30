import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar (desktop always visible, mobile toggle) */}
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar with menu button */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800">
          {children}
        </div>

      </div>
    </div>
  );
};